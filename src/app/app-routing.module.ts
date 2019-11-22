import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './paginas/login/login.module#LoginPageModule' },
  { path: 'inicio', loadChildren: './paginas/inicio/inicio.module#InicioPageModule' },
  { path: 'pedido', loadChildren: './paginas/pedido/pedido.module#PedidoPageModule' },
  { path: 'repartidor', loadChildren: './paginas/repartidor/repartidor.module#RepartidorPageModule' },
  { path: 'informacion', loadChildren: './paginas/informacion/informacion.module#InformacionPageModule' },
  { path: 'registro', loadChildren: './paginas/registro/registro.module#RegistroPageModule' },
  { path: 'historial', loadChildren: './paginas/historial/historial.module#HistorialPageModule' },  { path: 'resetar', loadChildren: './paginas/resetar/resetar.module#ResetarPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
