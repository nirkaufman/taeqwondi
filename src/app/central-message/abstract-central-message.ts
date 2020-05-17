import {BehaviorSubject, Observable} from "rxjs";
import {Message} from "./central-message.types";

export abstract class AbstractCentralMessage {
  protected _messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  protected _messageQueue: Message[] = []

  readonly messages$: Observable<Message[]> = this._messages.asObservable();

  abstract setMessage(message: Message): void;
  abstract removeMessage(message: Message): void;
}
