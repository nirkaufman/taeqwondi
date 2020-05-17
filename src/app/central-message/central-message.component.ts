import {Component, HostBinding, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Message} from "./central-message.types";
import {AbstractCentralMessage} from "./abstract-central-message";

@Component({
  selector: 'nk-central-message',
  template: `
    <ng-container *ngFor="let message of messages$ | async">
        <div class="alert alert-danger alert-dismissible fade show">
            {{ message.description }}
            <button (click)="remove(message)" class="close"><span>&times;</span></button>
        </div>
    </ng-container>  
  `,

})
export class CentralMessageComponent implements OnInit {
  messages$: Observable<Message[]>;

  constructor(private centralMessageService: AbstractCentralMessage) { }

  ngOnInit(): void {
    this.messages$ = this.centralMessageService.messages$;
  }

  remove(message: Message): void {
    this.centralMessageService.removeMessage(message);
  }

}
