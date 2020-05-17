import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from "rxjs/operators";
import {MessageType} from "./central-message.types";
import {AbstractCentralMessage} from "./abstract-central-message";

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {

  constructor(private centralMessageService: AbstractCentralMessage) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
        catchError((error: any) => {
          this.centralMessageService.setMessage({
            type: MessageType.Error,
            description: 'Something bad happened'
          })
          return of(error)
        })
    );
  }
}
