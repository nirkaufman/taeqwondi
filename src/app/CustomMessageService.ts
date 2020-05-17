import {AbstractCentralMessage} from "./central-message/abstract-central-message";
import {Message} from "./central-message/central-message.types";

export class CustomMessageService extends AbstractCentralMessage {


  removeMessage(message: Message): void {

  }

  setMessage(message: Message): void {
    alert('No Component for you!')
  }

}
