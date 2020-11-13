import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CategoriaDespesa } from 'src/app/core/models/despesaCategoria.model';
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
    this.isLoading = true;

    this.expenseService.getCategories(this.localStorage.userId).subscribe(
      response => {
        if (response.success) {
          this.isLoading = false;
          this.categories = response.categories;
        }
      });
  }

  getCategoryId(name: string): number {
    var category = this.categories.find(category => category.value === name);
    return category.CategoriaDespesaId;
  }

  deleteCategory(): void {
    if (this.formIsValid) {
      var categoryId = this.getCategoryId(this.category.value);
      this.isLoading = true;

      this.expenseService.deleteCategory(categoryId).subscribe(
        response => {
          if (response.success) {
            this.isLoading = false;
            this.loadCategories();
          }
        });
    }
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
    var category = new CategoriaDespesa(this.formCategory.value);
    this.isLoading = true;

    category.UsuarioId = this.localStorage.userId;

    this.expenseService.createCategory(category).subscribe(
      response => {
        if (response.success) {
          this.isLoading = false;
          this.loadCategories();
          this.cancel();
        }
      });
  }

  update(): void {
    var category = new CategoriaDespesa(this.formCategory.value);

    category.CategoriaDespesaId = this.currentCategoryId;
    category.UsuarioId = this.localStorage.userId;

    this.expenseService.updateCategory(category).subscribe(
      response => {
        if (response.success) {
          this.isLoading = false;
          this.loadCategories();
          this.cancel();
        }
      });
  }

  get formIsValid(): boolean {
    this.formCategory.markAllAsTouched();
    return this.formCategory.valid;
  }

  close(): void {
    this.resetFormValue();
    this.modalService.dismissAll();
    this.expenseService.loadComboCategories();
  }

  cancel(): void {
    this.edit = !this.edit;
    this.type = 'Lista';
    this.resetFormValue();
    this.expenseService.loadComboCategories();
  }

  resetFormValue(): void {
    this.formCategory.setValue({
      Nome: ''
    });
    this.formCategory.markAsUntouched();
  }
}
