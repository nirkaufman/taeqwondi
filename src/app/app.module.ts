import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CentralMessageModule} from "./central-message/central-message.module";
import {CentralMessageComponent} from "./central-message/central-message.component";
import {Message, MESSAGE_LOGGERS, MessageLogger} from "./central-message/central-message.types";
import {AbstractCentralMessage} from "./central-message/abstract-central-message";
import {CustomMessageService} from "./CustomMessageService";

class MessageConsoleLogger implements MessageLogger {
  logMessage(message: Message): void {
    console.log('MY CUSTOM CONSOLE LOOGER', message);
  }
}
class MessageServerLogger implements MessageLogger {
  logMessage(message: Message): void {
    console.log('Send to server', message);
  }
}


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, CentralMessageModule],
  providers: [
    // {
    //   provide: AbstractCentralMessage,
    //   useClass: CustomMessageService
    // },
    {
      provide: MESSAGE_LOGGERS,
      useClass: MessageConsoleLogger,
      multi: true
    },
    {
      provide: MESSAGE_LOGGERS,
      useClass: MessageServerLogger,
      multi: true
    }

  ],
  bootstrap: [AppComponent, CentralMessageComponent]
})
export class AppModule {
}
