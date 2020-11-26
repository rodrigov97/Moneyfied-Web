import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {

  // Exemplo de chamada do dialog

  // this.dataService.openWarningDialog({
  //   command: 'open',
  //   title: 'Atenção',
  //   content: 'Olá Mundo'
  // });

  closeResult: string;
  modalOption: NgbModalOptions = {};

  @ViewChild('warningModal') modal: ElementRef;

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
    this.dataService.callOpenWarningDialog().subscribe(value => {
      if (value.command === 'open') {
        this.title = value.title;
        this.content = value.content;

        this.myModal = this.modalService.open(this.modal, this.modalOption);
      }
    });
  }
}
