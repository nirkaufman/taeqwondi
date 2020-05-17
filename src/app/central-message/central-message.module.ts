import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CentralMessageComponent} from './central-message.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiErrorInterceptor} from "./api-error.interceptor";
import {AbstractCentralMessage} from "./abstract-central-message";
import {CentralMessageService} from "./central-message.service";
import {CentralMessageConfigurationService} from "./central-message-configuration.service";

@NgModule({
  declarations: [CentralMessageComponent],
  exports: [CentralMessageComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: CentralMessageConfigurationService) => () => {
        configService.loadConfiguration().toPromise()
      },
      deps: [CentralMessageConfigurationService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiErrorInterceptor,
      multi: true
    },
    {
      provide: AbstractCentralMessage,
      useClass: CentralMessageService
    }
  ]
})
export class CentralMessageModule {
}
