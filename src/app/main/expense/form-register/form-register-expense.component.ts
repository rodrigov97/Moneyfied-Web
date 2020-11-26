import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Despesa } from 'src/app/core/models/despesa.model';
import { DateService } from 'src/app/core/services/date.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { NumberHandlerService } from 'src/app/core/services/number-handler.service';
import { TokenErrorHandlerService } from 'src/app/core/services/token-error-handler.service';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-form-register-expense',
  templateUrl: './form-register-expense.component.html',
  styleUrls: ['./form-register-expense.component.scss']
})
export class FormRegisterComponent implements OnInit {

  closeResult: string;
  modalOption: NgbModalOptions = {};

  @ViewChild('formModal') modal: NgbModalRef;

  private myModal;

  isMobile: boolean = false;

  hideFields: boolean = true;

  title: string;
  content: string;

  formType: string = '';
  form: string = '';

  formExpense: FormGroup;

  formValue: Despesa;

  isLoading: boolean = false;
  isParcelado: boolean = false;

  subFormExpense: Subscription;

  categoryItems: any = [];

  parcelaChange: Subscription;
  valorChange: Subscription;
  reloadComboCategories: Subscription;

  constructor(
    private modalService: NgbModal,
    private dateService: DateService,
    private expenseService: ExpenseService,
    private storageService: LocalStorageService,
    private numberHandler: NumberHandlerService,
    private tokenErrorHandler: TokenErrorHandlerService
  ) {
    var date = new Date();

    this.formExpense = new FormGroup({
      Descricao: new FormControl(null, [Validators.required]),
      Valor: new FormControl(null, [Validators.required]),
      Parcelado: new FormControl(false),
      ParcelaQtd: new FormControl(null),
      ParcelaValor: new FormControl(null),
      DataInicial: new FormControl(null),
      DataFinal: new FormControl(null),
      DataPagamento: new FormControl(date, [Validators.required]),
      Categoria: new FormControl(null, [Validators.required])
    });
  }

  get descricao(): AbstractControl {
    return this.formExpense.get('Descricao');
  }

  get valor(): AbstractControl {
    return this.formExpense.get('Valor');
  }

  get parcelado(): AbstractControl {
    return this.formExpense.get('Parcelado');
  }

  get parcelaQtd(): AbstractControl {
    return this.formExpense.get('ParcelaQtd');
  }

  get parcelaValor(): AbstractControl {
    return this.formExpense.get('ParcelaValor');
  }

  get dataInicial(): AbstractControl {
    return this.formExpense.get('DataInicial');
  }

  get dataFinal(): AbstractControl {
    return this.formExpense.get('DataFinal');
  }

  get dataPagamento(): AbstractControl {
    return this.formExpense.get('DataPagamento');
  }

  get categoria(): AbstractControl {
    return this.formExpense.get('Categoria');
  }

  ngOnInit(): void {
    if (this.form === 'Alterar') {
      this.setExpenseItem();
    }
  }

  initFormListeners(): void {
    this.parcelaChange = this.parcelaQtd.valueChanges.subscribe(value => {
      if (this.valor.value) {
        var valor = parseFloat(this.valor.value.replace(',', '.')),
          parcelas = parseInt(value);

        if (valor > 0) {
          this.parcelaValor.setValue((valor / parcelas).toString().replace('.', ','));
        }
      }
    });

    this.valorChange = this.valor.valueChanges.subscribe(value => {
      if (this.valor.value) {
        var valor = parseFloat(value.replace(',', '.')),
          parcelas = parseInt(this.parcelaQtd.value);

        if (valor > 0 && parcelas > 0) {
          this.parcelaValor.setValue((valor / parcelas).toString().replace('.', ','));
        }
      }
    });
  }

  ngAfterViewInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.centered = true;
    this.modalOption.windowClass = 'no-border-radius';

    this.subFormExpense = this.expenseService.callOpenFormExpense().subscribe(value => {
      if (value.command === 'open') {
        this.title = value.title;
        this.content = value.content;
        this.formType = value.formType;
        this.form = value.form;
        this.formValue = value.data;
        this.isMobile = value.isMobile;

        this.myModal = this.modalService.open(this.modal, this.modalOption);

        if (this.formType === 'Alterar') {
          this.setExpenseItem();

          if (this.formValue.Parcelado)
            this.isParcelado = true;
        }

        this.initFormListeners();
        this.loadCategories();
      }
    });
  }

  cmbPagamentoChange(input: any): void {
    var checked = this.parcelado.value;

    this.hideFields = !checked;

    if (this.hideFields) {
      this.parcelaQtd.setValue(null);
      this.parcelaValor.setValue(null);
      this.dataInicial.setValue(null);
      this.dataFinal.setValue(null);
    }
    else {
      var date = new Date();
      this.dataInicial.setValue(date);
      this.dataFinal.setValue(date);
    }
  }

  ngOnDestroy(): void {
    this.subFormExpense.unsubscribe();
  }

  setExpenseItem(): void {
    this.formExpense.setValue({
      Descricao: this.formValue.Descricao,
      Valor: this.formValue.Valor,
      Parcelado: this.formValue.Parcelado,
      ParcelaQtd: this.formValue.ParcelaQtd,
      ParcelaValor: this.formValue.ParcelaValor,
      DataInicial: this.dateService.buildDateDefaultFormat(this.formValue.DataInicial),
      DataFinal: this.dateService.buildDateDefaultFormat(this.formValue.DataFinal),
      DataPagamento: this.dateService.buildDateDefaultFormat(this.formValue.DataPagamento),
      Categoria: this.setCategory(this.formValue.CategoriaDespesaId)
    });

    this.hideFields = !this.formValue.Parcelado;
  }

  loadCategories(): void {
    this.expenseService.getCategories(this.storageService.userId).subscribe(
      response => {
        if (response.success) {
          this.categoryItems = response.categories;
        }
      },
      error => {
        if (error.error && error.status !== 500)
          this.tokenErrorHandler.handleError(error.error);
      });
  }

  expenseOperations(): void {
    this.formExpense.markAllAsTouched();

    if (this.formExpense.valid) {
      if (this.formType === 'Cadastro') {
        this.insertExpense();
      }
      else if (this.formType === 'Alterar') {
        this.updateExpense();
      }
    }
  }

  insertExpense(): void {
    var formValue = {
      DespesaId: null,
      UsuarioId: this.storageService.userId,
      CategoriaDespesaId: this.getCategoryId(this.categoria.value),
      Descricao: this.descricao.value,
      Valor: this.numberHandler.formatValue(this.valor.value),
      Parcelado: this.parcelado.value,
      ParcelaQtd: this.parcelado.value ? this.parcelaQtd.value : 1,
      ParcelaNumero: null,
      ParcelaValor: this.parcelado.value ?
        this.numberHandler.formatValue(this.parcelaValor.value) :
        this.numberHandler.formatValue(this.valor.value),
      DataInicial: this.dateService.buildDateObj(this.dataInicial.value),
      DataFinal: this.dateService.buildDateObj(this.dataFinal.value),
      DataPagamento: this.dateService.buildDateObj(this.dataPagamento.value)
    },
      receita = new Despesa(formValue);

    this.isLoading = true;

    this.expenseService.insertExpense(receita).subscribe(
      response => {
        if (response.success) {
          this.isLoading = false;
          this.resetFormValue();
          this.expenseService.reloadGridEvent();
          this.modalService.dismissAll();
        }
        else {
          this.isLoading = false;
        }
      },
      error => {
        if (error.error && error.status !== 500)
          this.tokenErrorHandler.handleError(error.error);
      });
  }

  updateExpense(): void {
    var formValue = {
      DespesaId: this.formValue.DespesaId,
      UsuarioId: this.formValue.UsuarioId,
      CategoriaDespesaId: this.getCategoryId(this.categoria.value),
      Descricao: this.descricao.value,
      Valor: this.numberHandler.formatValue(this.valor.value),
      Parcelado: this.parcelado.value,
      ParcelaQtd: this.parcelado.value ? this.parcelaQtd.value : 1,
      ParcelaValor: this.parcelado.value ?
        this.numberHandler.formatValue(this.parcelaValor.value) :
        this.numberHandler.formatValue(this.valor.value),
      DataInicial: this.dateService.buildDateObj(this.dataInicial.value),
      DataFinal: this.dateService.buildDateObj(this.dataFinal.value),
      DataPagamento: this.dateService.buildDateObj(this.dataPagamento.value)
    },
      receita = new Despesa(formValue);

    receita.UsuarioId = this.storageService.userId;

    this.isLoading = true;

    this.expenseService.updateExpense(receita).subscribe(
      response => {
        if (response.success) {
          this.isLoading = false;
          this.resetFormValue();
          this.expenseService.reloadGridEvent();
          this.modalService.dismissAll();
        }
        else {
          this.isLoading = false;
        }
      },
      error => {
        if (error.error && error.status !== 500)
          this.tokenErrorHandler.handleError(error.error);
      });
  }

  getCategoryId(name: string): number {
    var category = this.categoryItems.find(category => category.value === name);
    return category.CategoriaDespesaId;
  }

  setCategory(id: number): number {
    var category = this.categoryItems.find(category => category.CategoriaDespesaId === id);
    return category.value;
  }

  onClose(): void {
    this.resetFormValue();
    this.modalService.dismissAll();
    this.isParcelado = false;
  }

  resetFormValue(): void {
    this.formExpense.setValue({
      Descricao: null,
      Valor: null,
      Parcelado: null,
      ParcelaQtd: null,
      ParcelaValor: null,
      DataInicial: new Date(),
      DataFinal: new Date(),
      DataPagamento: new Date(),
      Categoria: null
    });
    this.hideFields = true;
    this.formExpense.markAsUntouched();
    this.parcelaChange.unsubscribe();
    this.valorChange.unsubscribe();
  }
}
