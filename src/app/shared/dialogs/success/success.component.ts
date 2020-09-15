import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  // Exemplo de chamada do dialog

  // this.dataService.openSuccessDialogModal({
  //   command: 'open',
  //   title: 'Atenção',
  //   content: 'Olá Mundo'
  // });

  closeResult: string;
  modalOption: NgbModalOptions = {};

  @ViewChild('successModal') modal: ElementRef;

  private myModal;

  title: string;
  content: string;

  constructor(
    private modalService: NgbModal,
    private dataService: DataService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.dataService.currentToggleSuccessDialogValue.subscribe(value => {
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
