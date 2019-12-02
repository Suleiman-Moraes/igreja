import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../security/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'negociacao', loadChildren: './negociacao/negociacao.module#NegociacaoModule' },
  { path: 'debito', loadChildren: './debito/debito.module#DebitoModule' },
  { path: 'itemchecklist', loadChildren: './item-checklist/item-checklist.module#ItemChecklistModule' },
  { path: 'percentualreducao', loadChildren: './percentual-reducao/percentual-reducao.module#PercentualReducaoModule' },
  { path: 'parametro', loadChildren: './parametro/parametro.module#ParametroModule' },
  { path: 'prazo', loadChildren: './prazo/prazo.module#PrazoModule' },
  { path: 'mensagempadrao', loadChildren: './mensagem-padronizada/mensagem-padronizada.module#MensagemPadronizadaModule' },
  { path: 'situacaonotificacaotramite', loadChildren: './situacao-notificacao-tramite/situacao-notificacao-tramite.module#SituacaoNotificacaoTramiteModule' },
  { path: 'tipodebito', loadChildren: './tipo-debito/tipo-debito.module#TipoDebitoModule' },
  { path: 'indiceigpdi', loadChildren: './indice-igpdi/indice-igpdi.module#IndiceIgpdiModule' },
  { path: 'execucaofiscal', loadChildren: './execucao-fiscal/execucao-fiscal.module#ExecucaoFiscalModule' },
  { path: 'areaatuacao', loadChildren: './area-atuacao/area-atuacao.module#AreaAtuacaoModule' },
  { path: 'codigoreceita', loadChildren: './codigo-receita/codigo-receita.module#CodigoReceitaModule' },
  { path: 'codigoreceita', loadChildren: './codigo-receita/codigo-receita.module#CodigoReceitaModule' },
  { path: 'dataferiado', loadChildren: './data-feriado/data-feriado.module#DataFeriadoModule' },
  { path: 'saldoremanescente', loadChildren: './saldo-remanescente/saldo-remanescente.module#SaldoRemanescenteModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DividaAtivaRoutingModule { }
