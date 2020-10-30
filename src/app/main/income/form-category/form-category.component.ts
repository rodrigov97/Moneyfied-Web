import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CategoriaReceita } from 'src/app/core/models/incomeCategory.model';
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

  constructor(
    private incomeService: IncomeService,
    private modalService: NgbModal,
  ) {

    this.formCategory = new FormGroup({
      Categoria: new FormControl(null, [Validators.required])
    });
  }

  get category(): AbstractControl {
    return this.formCategory.get('Categoria');
  }

  ngOnInit(): void {
    this.loadCategories();
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
    this.incomeService.getCategories().subscribe(
      response => {
        if (response.success) {
          this.categories = response.categories;
        }
      });
  }

  getCategoryId(name: string): number {
    var category = this.categories.find(category => category.value === name);
    return category.number;
  }

  deleteCategory(): void {
    var categoryId = this.getCategoryId(this.category.value);

    this.incomeService.deleteCategory(categoryId).subscribe(
      response => {

      });
  }

  editCategory(): void {
    this.edit = !this.edit;
    this.type = 'Editar';
  }

  addCategory(): void {
    this.edit = !this.edit;
    this.type = 'Cadastrar';
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

    this.incomeService.createCategory(category).subscribe(
      response => {

      });
  }

  update(): void {
    var category = new CategoriaReceita(this.formCategory.value);

    this.incomeService.updateCategory(category).subscribe(
      response => {

      });
  }

  get formIsValid(): boolean {
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
      Categoria: null
    });
    this.formCategory.markAsUntouched();
  }
}
