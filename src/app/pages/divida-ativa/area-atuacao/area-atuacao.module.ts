import { NgModule } from '@angular/core';
import { AreaAtuacaoRoutingModule } from './area-atuacao-routing.module';
import { AreaAtuacaoListComponent } from './area-atuacao-list/area-atuacao-list.component';
import { AreaAtuacaoFormComponent } from './area-atuacao-form/area-atuacao-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AreaAtuacaoListComponent, AreaAtuacaoFormComponent],
  imports: [
    SharedModule,
    AreaAtuacaoRoutingModule
  ]
})
export class AreaAtuacaoModule { }
