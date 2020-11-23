import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalOptions, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Objetivo } from 'src/app/core/models/objetivos.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-form-register-goal',
  templateUrl: './form-register-goal.component.html',
  styleUrls: ['./form-register-goal.component.scss']
})
export class FormRegisterGoalComponent implements OnInit {

  modalOption: NgbModalOptions = {};

  @ViewChild('formGoalModal') modal: NgbModalRef;

  private myModal;

  formGoal: FormGroup;

  isLoading: boolean = false;

  isMobile: boolean = false;

  subFormGoal: Subscription;

  formType: string;
  formValue: Objetivo;

  labelValue: string;

  categories: any = [];

  currentCategoryId: number = 0;

  constructor(
    private modalService: NgbModal,
    private localStorage: LocalStorageService,
    private goalService: GoalService
  ) {

    this.formGoal = new FormGroup({
      Nome: new FormControl(null, Validators.required),
      ValorObjetivo: new FormControl(null, Validators.required),
      ValorAtual: new FormControl(null, Validators.required),
      DataLimite: new FormControl(new Date(), Validators.required)
    });
  }

  get nome(): AbstractControl {
    return this.formGoal.get('Nome');
  }

  get valorObjetivo(): AbstractControl {
    return this.formGoal.get('ValorObjetivo');
  }

  get valorAtual(): AbstractControl {
    return this.formGoal.get('ValorAtual');
  }

  get dataLimite(): AbstractControl {
    return this.formGoal.get('DataLimite');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subFormGoal.unsubscribe();
  }

  ngAfterViewInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.centered = true;
    this.modalOption.windowClass = 'no-border-radius';

    this.subFormGoal = this.goalService.callOpenFormGoal().subscribe(value => {
      if (value.command === 'open') {
        this.formType = value.formType;
        this.formValue = value.data;
        this.isMobile = value.isMobile;

        this.myModal = this.modalService.open(this.modal, this.modalOption);

        if (this.formType === 'Alterar') {
          this.labelValue = 'Valor Atual (R$)';
        }
        else {
          this.labelValue = 'Valor Inicial (R$)';
        }

      }
    });
  }

  onClose(): void {
    this.resetForm();
    this.modalService.dismissAll();

    this.formGoal.markAsUntouched();
  }

  resetForm(): void {
    this.formGoal.setValue({
      Nome: null,
      ValorObjetivo: null,
      ValorAtual: null,
      DataLimite: new Date()
    })
  }

  goalOperations(): void {
    this.formGoal.markAllAsTouched();

    if (this.isFormValid) {
      if (this.formType === 'Cadastrar') {

      }
      else if (this.formType === 'Alterar') {

      }

    }

  }

  get isFormValid(): boolean {
    return this.formGoal.valid;
  }
}
