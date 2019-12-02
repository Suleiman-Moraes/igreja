import { DIVIDAATIVA_API_SALDO_REMANESCENTE } from './../dividaativa.api';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { SaldoRemanescente } from '../models/saldo-remanescente.model';

@Injectable({
  providedIn: 'root'
})
export class SaldoRemanescenteService extends BaseResourceService<SaldoRemanescente>{

  constructor(protected injector: Injector) {
    super(DIVIDAATIVA_API_SALDO_REMANESCENTE, injector, SaldoRemanescente.fromJson);
  }
}