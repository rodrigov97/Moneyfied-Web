import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {

  // Exemplo de chamada do dialog

  // this.dataService.openErrorDialogModal({
  //   command: 'open',
  //   title: 'Atenção',
  //   content: 'Olá Mundo'
  // });


  closeResult: string;
  modalOption: NgbModalOptions = {};

  @ViewChild('formModal') modal: ElementRef;

  private myModal;

  title: string;
  content: string;

  formType: string = '';
  form: string = '';

  formIncome: FormGroup;
  formExpenses: FormGroup;

  constructor(
    private modalService: NgbModal,
    private dataService: DataService
  ) {

    this.formIncome = new FormGroup({
      DescricaoR: new FormControl(''),
      ValorR: new FormControl(''),
      DataRecebimento: new FormControl(new Date()),
    });
  }

  get descricaoR(): AbstractControl {
    return this.formIncome.get('DescricaoR');
  }

  get valorR(): AbstractControl {
    return this.formIncome.get('ValorR');
  }

  get dataRecebimento(): AbstractControl {
    return this.formIncome.get('DataRecebimento');
  }

  ngOnInit(): void {
    if (this.form === 'Receita') {
      this.prepareFormReceita();
    }
    else if (this.form === 'Despesa') {

    }
  }

  ngAfterViewInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.centered = true;
    this.dataService.currentToggleFormRegisterValue.subscribe(value => {
      if (value.command === 'open') {
        this.title = value.title;
        this.content = value.content;
        this.formType = value.formType;
        this.form = value.form;

        this.myModal = this.modalService.open(this.modal, this.modalOption);
      }
      else {
        this.myModal = this.modalService.dismissAll;
      }
    });
  }

  prepareFormReceita(): void {
    if (this.formType === 'Cadastro') {

    }
    else if (this.formType === 'Alterar') {

    }
  }
}
