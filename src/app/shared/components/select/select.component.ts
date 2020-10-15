import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

import { Validations } from "src/app/core/services/validation-handler";
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends Validations implements OnInit {

  @Input() label: string;
  @Input() fieldId: string;
  @Input() name: string;
  @Input() control: FormControl = new FormControl();
  @Input() readonly: boolean = false;
  @Input() class: string = '';
  @Input() items: any;

  @Input() forceErrorMessage: string;

  @Output() fieldBlur = new EventEmitter<void>();

  objectFn = Object;

  constructor(
    formError: ErrorHandlerService
  ) {
    super(formError)
  }

  ngOnInit(): void {
  }

  isInvalid(): boolean {
    return !!this.forceErrorMessage || (this.control.touched && this.control.invalid);
  }

  isValid(): boolean {
    return !this.forceErrorMessage && this.control.touched && this.control.valid;
  }

  get errorMessage(): string {
    return this.setErrorMessage(this.control);
  }

  private trimField(): void {
    if (!this.control.value) { return; }

    const trimControl = this.control.value.trim();
    this.control.setValue(trimControl);
  }
}
