import { Injectable } from '@angular/core';

export interface FormErrorData {
  [key: string]: string;
}

export interface FormErrorMessages {
  [error: string]: string;
}

const ERROR_MESSAGES: FormErrorMessages = {
  'Mask error': 'Formato inválido.',
  cnpj: 'CNPJ inválido',
  cpf: 'CPF inválido',
  decimalScale: 'Máximo de {{requiredScale}} casas decimais',
  email: 'E-mail inválido.',
  greaterThan: 'Valor deve ser maior que {{greater}}',
  integer: 'Deve ser um número inteiro',
  max: 'Valor máximo: {{max}}',
  minlength: 'Mínimo de {{requiredLength}} caracteres',
  number: 'Deve ser um número',
  present: 'Campo obrigatório',
  required: 'Campo obrigatório',
  time: 'Horário inválido',
  timeGreaterThan: 'Deve ser maior que {{minTime}}',
  timeMax: 'Horário máximo {{maxTime}}',
  timeMin: 'Horário mínimo {{minTime}}',
};

@Injectable()
export class ErrorHandlerService {

  get(error: string, errorData: FormErrorData = {}): string {
    return this.buildMessage(errorData, error);
  }

  private buildMessage(errorData: FormErrorData, error: string): string {
    const message = ERROR_MESSAGES[error] || '';
    const keys = Object.keys(errorData);

    if (keys.length <= 0) { return message; }

    return keys.reduce((acc: string, key: string): string => {
      return acc.replace(`{{${key}}}`, errorData[key]);
    }, message);
  }
}
