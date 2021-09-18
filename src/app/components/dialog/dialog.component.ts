import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit {

  @Input() targetID: string = '';
  @Input() dlgTitle: string = 'Notification';
  @Input() dlgMessage: string = '';
  @Input() btnCancel: string = 'Cancel';
  @Input() btnSave: string = 'OK';
  @Input() showCloseIcon: boolean = false;
  @Input() dlgClass: string = '';
  @Input() dlgHTML: SafeHtml = '';
  @Input() closeAndSave: boolean = true;

  @Output() handleConfirm = new EventEmitter;
  @Output() handelCancel = new EventEmitter;
    private element: any;

    constructor(private dialogService: DialogService, private el: ElementRef) {
        this.element = this.el.nativeElement;
    }

    ngOnInit(): void {
      console.log(this.dlgClass.length);
    }
}
