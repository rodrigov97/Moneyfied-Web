import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

import { Validations } from "src/app/core/services/validation-handler";
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

export enum InputType {
  Datetime = 'datetime',
  Email = 'email',
  Number = 'number',
  Password = 'password',
  Phone = 'phone',
  Text = 'text',
  Url = 'url',
  Textarea = 'textarea',
}

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent extends Validations implements OnInit {

  @Input() label: string;
  @Input() fieldId: string;
  @Input() name: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() control: FormControl = new FormControl();
  @Input() readonly: boolean = false;
  @Input() append: boolean;
  @Input() trim: boolean = false;
  @Input() class: string = '';

  @Input() hasCounter: boolean;
  @Input() max: number;
  @Input() maxlength: number;
  @Input() min: number;
  @Input() minlength: number;

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

  onBlur(): void {
    this.fieldBlur.emit();
    if (this.trim) { this.trimField(); }
  }

  private trimField(): void {
    if (!this.control.value) { return; }

    const trimControl = this.control.value.trim();
    this.control.setValue(trimControl);
  }

  onKeyUp(event: any): void {
    if (!this.control.value) { return; }

    const spaceControl = this.control.value.replaceAll('.', '');
    this.control.setValue(spaceControl);
  }
}
