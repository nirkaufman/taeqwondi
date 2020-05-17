import {InjectionToken} from "@angular/core";

export enum MessageType {Error, Info, Success}

export interface Message {
  type: MessageType,
  description: string;
}

export interface MessageLogger {
  logMessage(message: Message): void
}

export const MESSAGE_LOGGERS = new InjectionToken<MessageLogger[]>('logic for logging messages');

export interface CentralMessageConfig {
  enableLoggers: boolean
}
