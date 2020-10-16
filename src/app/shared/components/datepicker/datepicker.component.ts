import { Component, OnInit, Input, Output, EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Validations } from "src/app/core/services/validation-handler";
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if(typeof value !== 'string') {
      if (value) {
        const date = new Date(value);
        return {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear()
        };
      }
      return null;
    }
    else {
      if (value) {
        let date = value.split(this.DELIMITER);
        return {
          day: parseInt(date[0], 10),
          month: parseInt(date[1], 10),
          year: parseInt(date[2], 10)
        };
      }
      return null;
    }
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class DatepickerComponent extends Validations implements OnInit, OnDestroy {

  @Input() label: string;
  @Input() fieldId: string;
  @Input() name: string;
  @Input() control: FormControl = new FormControl();
  @Input() class: string = '';

  @Input() forceErrorMessage: string;

  objectFn = Object;

  constructor(
    formError: ErrorHandlerService
  ) {
    super(formError)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.control.setValue(new Date());
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

}
