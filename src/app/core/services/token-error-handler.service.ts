import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class TokenErrorHandlerService {

  constructor(
    private dataService: DataService
  ) { }

  handleError(error: any): void {
    if (error.error && error.status !== 500) {
      this.handleTokenError(error);
    }
  }

  private handleTokenError(error: any): void {
    var message = '';
    if (error.name === 'TokenExpiredError') {
      message = 'Sessão expirada';
    }
    else {
      message = 'Ocorreu um erro na sessão';
    }

    this.dataService.openTokenErrorDialogModal({
      command: 'open',
      title: 'Erro de Sessão',
      content: message
    })
  }
}
