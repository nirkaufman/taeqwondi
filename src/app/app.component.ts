import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CentralMessageService} from "./central-message/central-message.service";
import {MessageType} from "./central-message/central-message.types";

@Component({
  selector: 'app-root',
  template: `
      <h1>Tae Qwon DI</h1>
      <div class="btn-group">
          <button (click)="generateCode(200)" class="btn btn-success">Generate 200</button>
          <button (click)="generateCode(404)" class="btn btn-warning">Generate 404</button>
          <button (click)="generateCode(500)" class="btn btn-danger">Generate 500</button>
      </div>
  `,
})
export class AppComponent {

  constructor(private httpClient: HttpClient, private centralMessageService: CentralMessageService) {}

  generateCode(status: number) {
    this.httpClient.get(`https://httpstat.us/${status}?sleep=2000`).subscribe()

    if (status === 200) {
      this.centralMessageService.setMessage({
        type: MessageType.Success,
        description: 'YES!'
      })
    }
  }
}
