import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CategoriaReceita } from 'src/app/core/models/receitaCategoria.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { IncomeService } from '../income.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
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
      });
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
