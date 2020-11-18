import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-token-error',
  templateUrl: './token-error.component.html',
  styleUrls: ['./token-error.component.scss']
})
export class TokenErrorComponent implements OnInit {

  // Exemplo de chamada do dialog

  // this.dataService.openTokenDialogModal({
  //   command: 'open',
  //   title: 'Atenção',
  //   content: 'Olá Mundo'
  // });

  closeResult: string;
  modalOption: NgbModalOptions = {};

  @ViewChild('tokenErrorModal') modal: ElementRef;

  private myModal;

  title: string;
  content: string;

  constructor(
    private route: Router,
    private modalService: NgbModal,
    private dataService: DataService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.dataService.currentToggleTokenErrorDialogValue.subscribe(value => {
      if (value.command === 'open') {
        this.title = value.title;
        this.content = value.content;

        this.myModal = this.modalService.open(this.modal, this.modalOption);
      }
      else {
        this.myModal = this.modalService.dismissAll;
      }
    });
  }

  returnToLogin(): void {
    this.modalService.dismissAll();
    localStorage.clear();
    this.route.navigate(['login']);
  }
}
