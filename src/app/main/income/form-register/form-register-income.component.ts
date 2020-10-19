import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
export class FormRegisterIncomeComponent implements OnInit {

  // Exemplo de chamada do dialog

  // this.dataService.openErrorDialogModal({
  //   command: 'open',
  //   title: 'Atenção',
  //   content: 'Olá Mundo'
  // });


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

  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
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
    }
    else if (this.form === 'Cadastrar') {
      this.prepareFormReceita();
    }
  }

  ngAfterViewInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.centered = true;
    this.modalOption.windowClass = 'no-border-radius';
    this.incomeService.currentToggleFormRegisterValue.subscribe(value => {
      if (value.command === 'open') {
        this.title = value.title;
        this.content = value.content;
        this.formType = value.formType;
        this.form = value.form;
        this.formValue = value.data;

        this.myModal = this.modalService.open(this.modal, this.modalOption);
      }
    });
  }

  prepareFormReceita(): void {
    if (this.formType === 'Alterar') {
      this.setIncomeItem();
    }
  }

  setIncomeItem(): void {
    this.formExpenses.setValue({
      DescricaoR: this.formValue.Descricao,
      ValorR: this.formValue.Valor,
      DataRecebimento: this.formValue.DataRecebimento,
    });
  }

  incomeOperations(): void {
    this.formIncome.markAllAsTouched();

    if (this.formIncome.valid) {
      if (this.formType === 'Cadastro') {
        this.insertIncome();
      }
      else if (this.formType === 'Alterar') {

      }
    }
  }

  insertIncome(): void {
    var formValue = {
      ReceitaId: null,
      UsuarioId: null,
      Descricao: this.descricao.value,
      Valor: this.numberHandler.formatValue(this.valor.value),
      DataRecebimento: this.dateService.ISOdateFormat(this.dataRecebimento.value)
    },
      receita = new Receita(formValue);
    debugger
    receita.UsuarioId = this.storageService.userId;

    this.isLoading = true;

    this.incomeService.insertIncome(receita).subscribe(
      response => {
        if (response.success) {
          this.isLoading = false;
          this.formIncome.reset();
          this.incomeService.reloadGridEvent();
          this.modalService.dismissAll();
        }
        else {
          this.isLoading = false;
        }
      });
  }

  onClose(): void {
    this.formIncome.reset();
    this.modalService.dismissAll();
  }
}
