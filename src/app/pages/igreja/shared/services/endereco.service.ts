import { Injectable, Injector } from '@angular/core';
import { IGREJA_API_ENDERECO } from '../igreja.api';
import { Endereco } from '../models/endereco.model';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { Observable } from 'rxjs';
import { EnderecoCorreio } from '../models/endereco-correio.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService extends BaseResourceService<Endereco>{

  constructor(protected injector: Injector) {
    super(IGREJA_API_ENDERECO, injector, Endereco.fromJson);
  }

  obterEnderecoCorreios(cep: string): Observable<EnderecoCorreio>{
    const url: string = `https://viacep.com.br/ws/${cep}/json/`;
    const json: any = this.http.get(url);

    return json.pipe(
      map(EnderecoCorreio.fromJson.bind(this)),
      catchError(this.handleError)
    );
  }
}
