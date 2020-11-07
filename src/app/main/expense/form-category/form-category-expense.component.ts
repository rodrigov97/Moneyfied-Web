import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-form-category-expense',
  templateUrl: './form-category-expense.component.html',
  styleUrls: ['./form-category-expense.component.scss']
})
export class FormCategoryComponent implements OnInit {

  modalOption: NgbModalOptions = {};

  @ViewChild('formCategoryModal') modal: NgbModalRef;

  private myModal;

  formCategory: FormGroup;

  isLoading: boolean = false;

  subFormCategory: Subscription;

  formType: string;

  categories: any = [];

  edit: boolean = false;
  type: string = 'Lista';

  currentCategoryId: number = 0;

  constructor(
    private expenseService: ExpenseService,
    private modalService: NgbModal,
    private localStorage: LocalStorageService
  ) {

    this.formCategory = new FormGroup({
      Nome: new FormControl(null, [Validators.required])
    });
  }

  get category(): AbstractControl {
    return this.formCategory.get('Nome');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subFormCategory.unsubscribe();
  }

  ngAfterViewInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.centered = true;
    this.modalOption.windowClass = 'no-border-radius';

    this.subFormCategory = this.expenseService.callOpenFormCategory().subscribe(value => {
      if (value.command === 'open') {
        this.formType = value.formType;

        this.loadCategories();

        this.myModal = this.modalService.open(this.modal, this.modalOption);

        if (this.formType === 'Alterar')
          this.setCategoryData();
      }
    });
  }

  setCategoryData(): void {
    this.formCategory.setValue({
      Categoria: null
    });
  }

  loadCategories(): void {

  }

  getCategoryId(name: string): number {
    var category = this.categories.find(category => category.value === name);
    return category.CategoriaDespesaId;
  }

  deleteCategory(): void {

  }

  editCategory(): void {
    if (this.formIsValid) {
      this.edit = !this.edit;
      this.type = 'Editar';

      this.currentCategoryId = this.getCategoryId(this.category.value);
    }
  }

  addCategory(): void {
    this.edit = !this.edit;
    this.type = 'Cadastrar';
    this.formCategory.reset();
  }

  saveCategory(): void {
    this.formCategory.markAllAsTouched();

    if (this.formIsValid) {
      if (this.type === 'Cadastrar') {
        this.create();
      }
      else {
        this.update();
      }
    }
  }

  create(): void {

  }

  update(): void {

  }

  get formIsValid(): boolean {
    this.formCategory.markAllAsTouched();
    return this.formCategory.valid;
  }

  close(): void {
    this.resetFormValue();
    this.modalService.dismissAll();
  }

  cancel(): void {
    this.edit = !this.edit;
    this.type = 'Lista';
    this.resetFormValue();
  }

  resetFormValue(): void {
    this.formCategory.setValue({
      Nome: ''
    });
    this.formCategory.markAsUntouched();
  }
}
