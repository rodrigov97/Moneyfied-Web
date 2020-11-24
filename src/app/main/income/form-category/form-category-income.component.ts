import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CategoriaReceita } from 'src/app/core/models/receitaCategoria.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { TokenErrorHandlerService } from 'src/app/core/services/token-error-handler.service';
import { IncomeService } from '../income.service';

@Component({
  selector: 'app-form-category-income',
  templateUrl: './form-category-income.component.html',
  styleUrls: ['./form-category-income.component.scss']
})
export class FormCategoryComponent implements OnInit, OnDestroy {

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
    private incomeService: IncomeService,
    private modalService: NgbModal,
    private localStorage: LocalStorageService,
    private tokenErrorHandler: TokenErrorHandlerService
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

    this.subFormCategory = this.incomeService.callOpenFormCategory().subscribe(value => {
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

    this.incomeService.getCategories(this.localStorage.userId).subscribe(
      response => {
        if (response.success) {
          this.isLoading = false;
          this.categories = response.categories;
        }
      },
      error => {
        if (error.error && error.status !== 500)
          this.tokenErrorHandler.handleError(error.error);
      });
  }

  getCategoryId(name: string): number {
    var category = this.categories.find(category => category.value === name);
    return category.CategoriaReceitaId;
  }

  deleteCategory(): void {
    if (this.formIsValid) {
      var categoryId = this.getCategoryId(this.category.value);
      this.isLoading = true;

      this.incomeService.deleteCategory(categoryId).subscribe(
        response => {
          if (response.success) {
            this.isLoading = false;
            this.loadCategories();
          }
        },
        error => {
          if (error.error && error.status !== 500)
            this.tokenErrorHandler.handleError(error.error);
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
    var category = new CategoriaReceita(this.formCategory.value);
    this.isLoading = true;

    category.UsuarioId = this.localStorage.userId;

    this.incomeService.createCategory(category).subscribe(
      response => {
        if (response.success) {
          this.isLoading = false;
          this.loadCategories();
          this.cancel();
        }
      },
      error => {
        if (error.error && error.status !== 500)
          this.tokenErrorHandler.handleError(error.error);
      });
  }

  update(): void {
    var category = new CategoriaReceita(this.formCategory.value);

    category.CategoriaReceitaId = this.currentCategoryId;
    category.UsuarioId = this.localStorage.userId;

    this.incomeService.updateCategory(category).subscribe(
      response => {
        if (response.success) {
          this.isLoading = false;
          this.loadCategories();
          this.cancel();
        }
      },
      error => {
        if (error.error && error.status !== 500)
          this.tokenErrorHandler.handleError(error.error);
      });
  }

  get formIsValid(): boolean {
    this.formCategory.markAllAsTouched();
    return this.formCategory.valid;
  }

  close(): void {
    this.resetFormValue();
    this.modalService.dismissAll();
    this.incomeService.loadComboCategories();
  }

  cancel(): void {
    this.edit = !this.edit;
    this.type = 'Lista';
    this.resetFormValue();
    this.incomeService.loadComboCategories();
  }

  resetFormValue(): void {
    this.formCategory.setValue({
      Nome: ''
    });
    this.formCategory.markAsUntouched();
  }
}
