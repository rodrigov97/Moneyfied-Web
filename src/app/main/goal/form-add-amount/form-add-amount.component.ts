import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Objetivo } from 'src/app/core/models/objetivo.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { TokenErrorHandlerService } from 'src/app/core/services/token-error-handler.service';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-form-add-amount',
  templateUrl: './form-add-amount.component.html',
  styleUrls: ['./form-add-amount.component.scss']
})
export class FormAddAmountComponent implements OnInit {

  modalOption: NgbModalOptions = {};

  @ViewChild('formAddAmount') modal: NgbModalRef;

  private myModal;

  isLoading: boolean = false;

  formAdd: FormGroup;

  subFormAdd: Subscription;

  goalData: Objetivo;

  constructor(
    private modalService: NgbModal,
    private localStorage: LocalStorageService,
    private goalService: GoalService,
    private tokenErrorHandler: TokenErrorHandlerService
  ) {

    this.formAdd = new FormGroup({
      Valor: new FormControl(null, Validators.required)
    });
  }

  get valor(): AbstractControl {
    return this.formAdd.get('Valor');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subFormAdd.unsubscribe();
  }

  ngAfterViewInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.centered = true;
    this.modalOption.windowClass = 'no-border-radius';

    this.subFormAdd = this.goalService.callOpenFormAddAmount().subscribe(value => {
      if (value.command === 'open') {
        this.goalData = value.data;

        this.myModal = this.modalService.open(this.modal, this.modalOption);
      }
    });
  }

  addAmount(): void {
    this.formAdd.markAllAsTouched();

    if (this.isFormValid) {
      var amount = parseFloat(this.valor.value);

      this.isLoading = false;

      this.goalService.addAmount(this.goalData.ObjetivoId, amount).subscribe(
        response => {
          if (response.success) {
            this.isLoading = false;
            this.resetForm();
            this.goalService.reloadGridEvent();
            this.modalService.dismissAll();
          }
        },
        error => {
          if (error.error)
            this.tokenErrorHandler.handleError(error.error);
        });
    }
  }

  onClose(): void {
    this.resetForm();
    this.modalService.dismissAll();

    this.formAdd.markAsUntouched();
  }

  resetForm(): void {
    this.formAdd.setValue({
      Valor: null
    })
  }

  get isFormValid(): boolean {
    return this.formAdd.valid;
  }
}
