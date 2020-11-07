import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Despesa } from 'src/app/core/models/despesa.model';
import { Receita } from 'src/app/core/models/receita.model';
import { DateService } from 'src/app/core/services/date.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { NumberHandlerService } from 'src/app/core/services/number-handler.service';
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

  subFormExpense: Subscription;

  categoryItems: any = [];

  constructor(
    private modalService: NgbModal,
    private dateService: DateService,
    private expenseService: ExpenseService,
    private storageService: LocalStorageService,
    private numberHandler: NumberHandlerService
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
      DataPagamento: new FormControl(date, [Validators.required])
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

  ngOnInit(): void {
    if (this.form === 'Alterar') {
      this.setIncomeItem();
    }

    this.loadCategories();
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

        if (this.formType === 'Alterar')
          this.setIncomeItem();
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
      var date =  new Date();
      this.dataInicial.setValue(date);
      this.dataFinal.setValue(date);
    }
  }

  ngOnDestroy(): void {
    this.subFormExpense.unsubscribe();
  }

  setIncomeItem(): void {

  }

  loadCategories(): void {

  }

  incomeOperations(): void {
    this.formExpense.markAllAsTouched();

    if (this.formExpense.valid) {
      if (this.formType === 'Cadastro') {
        this.insertIncome();
      }
      else if (this.formType === 'Alterar') {
        this.updateIncome();
      }
    }
  }

  insertIncome(): void {

  }

  updateIncome(): void {

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
  }

  resetFormValue(): void {
    this.formExpense.setValue({
      Descricao: null,
      Valor: null,
      Categoria: null,
      DataRecebimento: new Date()
    });
    this.formExpense.markAsUntouched();
  }
}
