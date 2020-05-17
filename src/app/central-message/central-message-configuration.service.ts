import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CentralMessageConfig} from "./central-message.types";
import {HttpClient} from "@angular/common/http";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CentralMessageConfigurationService {
  private readonly CONFIG_URL = 'assets/central-message.config.json';
  private config$: Observable<CentralMessageConfig>

  configuration: CentralMessageConfig;

  constructor(private httpClient: HttpClient) {}

  loadConfiguration() {
    this.config$ = this.httpClient.get<CentralMessageConfig>(this.CONFIG_URL).pipe(shareReplay(1))
    this.config$.subscribe( config => this.configuration = config );

    return this.config$;

  }
}
