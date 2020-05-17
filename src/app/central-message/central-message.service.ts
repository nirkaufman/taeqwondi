import {Inject, Injectable, Optional} from '@angular/core';
import {Message, MESSAGE_LOGGERS, MessageLogger} from "./central-message.types";
import {AbstractCentralMessage} from "./abstract-central-message";
import {CentralMessageConfigurationService} from "./central-message-configuration.service";

@Injectable({providedIn: 'root'})
export class CentralMessageService extends AbstractCentralMessage{

  constructor(@Inject(MESSAGE_LOGGERS) @Optional() private loggers: MessageLogger[],
              private centralMessageConfigurationService: CentralMessageConfigurationService
              ) {
    super()
  }

  public setMessage(message: Message) : void {
    this._messageQueue.push(message);
    this._messages.next([...this._messageQueue]);

    if(this.centralMessageConfigurationService.configuration.enableLoggers) {
      if (this.loggers && this.loggers.length > 0) {
        this.loggers.forEach(logger => {
          logger.logMessage(message);
        })
      }
    }


  }

  public removeMessage(message: Message) : void {
    const index = this._messageQueue.indexOf(message);
    this._messageQueue.splice(index, 1);
    this._messages.next([...this._messageQueue]);
  }


}
