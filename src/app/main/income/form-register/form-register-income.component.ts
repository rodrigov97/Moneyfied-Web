import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Receita } from 'src/app/core/models/income.model';
import { DateService } from 'src/app/core/services/date.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { NumberHandlerService } from 'src/app/core/services/number-handler.service';
import { DataService } from 'src/app/shared/data.service';
import { IncomeService } from '../income.service';


@Component({
  selector: 'app-form-register-income',
  templateUrl: './form-register-income.component.html',
  styleUrls: ['./form-register-income.component.scss']
})
export class FormRegisterIncomeComponent implements OnInit, OnDestroy {

  closeResult: string;
  modalOption: NgbModalOptions = {};

  @ViewChild('formModal') modal: NgbModalRef;

  private myModal;

  title: string;
  content: string;

  formType: string = '';
  form: string = '';

  formIncome: FormGroup;
  formExpenses: FormGroup;

  formValue: Receita;

  isLoading: boolean = false;

  subFormIncome: Subscription;

  constructor(
    private modalService: NgbModal,
    private dateService: DateService,
    private incomeService: IncomeService,
    private storageService: LocalStorageService,
    private numberHandler: NumberHandlerService
  ) {

    this.formIncome = new FormGroup({
      Descricao: new FormControl(null, [Validators.required]),
      Valor: new FormControl(null, [Validators.required]),
      DataRecebimento: new FormControl(new Date(), [Validators.required]),
    });
  }

  get descricao(): AbstractControl {
    return this.formIncome.get('Descricao');
  }

  get valor(): AbstractControl {
    return this.formIncome.get('Valor');
  }

  get dataRecebimento(): AbstractControl {
    return this.formIncome.get('DataRecebimento');
  }

  ngOnInit(): void {
    if (this.form === 'Alterar') {
      this.setIncomeItem();
    }
  }

  ngAfterViewInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.centered = true;
    this.modalOption.windowClass = 'no-border-radius';

    this.subFormIncome = this.incomeService.callOpenFormIncome().subscribe(value => {
      if (value.command === 'open') {
        this.title = value.title;
        this.content = value.content;
        this.formType = value.formType;
        this.form = value.form;
        this.formValue = value.data;

        this.myModal = this.modalService.open(this.modal, this.modalOption);

        if (this.formType === 'Alterar')
          this.setIncomeItem();
      }
    });
  }

  ngOnDestroy(): void {
    this.subFormIncome.unsubscribe();
  }

  setIncomeItem(): void {
    this.formIncome.setValue({
      Descricao: this.formValue.Descricao,
      Valor: this.formValue.Valor,
      DataRecebimento: new Date(this.formValue.DataRecebimento),
    });
  }

  incomeOperations(): void {
    this.formIncome.markAllAsTouched();

    if (this.formIncome.valid) {
      if (this.formType === 'Cadastro') {
        this.insertIncome();
      }
      else if (this.formType === 'Alterar') {
        this.updateIncome();
      }
    }
  }

  insertIncome(): void {
    var formValue = {
      ReceitaId: null,
      UsuarioId: null,
      Descricao: this.descricao.value,
      Valor: this.numberHandler.formatValue(this.valor.value),
      DataRecebimento: this.dateService.buildDateObj(this.dataRecebimento.value)
    },
      receita = new Receita(formValue);

    receita.UsuarioId = this.storageService.userId;

    this.isLoading = true;

    this.incomeService.insertIncome(receita).subscribe(
      response => {
        if (response.success) {
          this.isLoading = false;
          this.resetFormValue();
          this.incomeService.reloadGridEvent();
          this.modalService.dismissAll();
        }
        else {
          this.isLoading = false;
        }
      });
  }

  updateIncome(): void {
    var formValue = {
      ReceitaId: this.formValue.ReceitaId,
      UsuarioId: this.formValue.UsuarioId,
      Descricao: this.descricao.value,
      Valor: this.numberHandler.formatValue(this.valor.value),
      DataRecebimento: this.dateService.buildDateObj(this.dataRecebimento.value)
    },
    receita = new Receita(formValue);

    receita.UsuarioId = this.storageService.userId;

    this.isLoading = true;

    this.incomeService.updateIncome(receita).subscribe(
      response => {
        if (response.success) {
          this.isLoading = false;
          this.resetFormValue();
          this.incomeService.reloadGridEvent();
          this.modalService.dismissAll();
        }
        else {
          this.isLoading = false;
        }
      });
  }

  onClose(): void {
    this.resetFormValue();
    this.modalService.dismissAll();
  }

  resetFormValue(): void {
    this.formIncome.setValue({
      Descricao: null,
      Valor: null,
      DataRecebimento: new Date()
    });
    this.formIncome.markAsUntouched();
  }
}
