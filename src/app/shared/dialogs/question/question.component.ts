import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  // Exemplo de chamada do dialog

  // this.dataService.openQuestionDialogModal({
  //   command: 'open',
  //   title: 'Atenção',
  //   question: 'Olá Mundo'
  // });

  questionToggle: Subscription;

  closeResult: string;
  modalOption: NgbModalOptions = {};

  @ViewChild('questionModal') modal: ElementRef;

  private myModal;

  title: string;
  question: string;
  callback: Function;
  extras: any;

  constructor(
    private modalService: NgbModal,
    private dataService: DataService) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy():void {
    this.questionToggle.unsubscribe();
  }

  ngAfterViewInit() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.questionToggle = this.dataService.callOpenQuestionDialog().subscribe(value => {
      if (value.command === 'open') {
        this.title = value.title;
        this.question = value.question;
        this.callback = value.callback;
        this.extras = value.extras;

        this.myModal = this.modalService.open(this.modal, this.modalOption);
      }
    });
  }

  answer(answer: boolean): void {
    this.callback(answer, this.extras, this.questionToggle);
    this.modalService.dismissAll();
  }
}
