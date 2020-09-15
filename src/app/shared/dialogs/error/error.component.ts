import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  // Exemplo de chamada do dialog

  // this.dataService.openErrorDialogModal({
  //   command: 'open',
  //   title: 'Atenção',
  //   content: 'Olá Mundo'
  // });

  closeResult: string;
  modalOption: NgbModalOptions = {};

  @ViewChild('errorModal') modal: ElementRef;

  private myModal;

  title: string;
  content: string;

  constructor(
    private modalService: NgbModal,
    private dataService: DataService
    ) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.dataService.currentToggleErrorDialogValue.subscribe(value => {
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
}
