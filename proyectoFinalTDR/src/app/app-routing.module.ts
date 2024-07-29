import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },

  {
    path: 'personajes',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./personajes/personajes.module').then( m => m.PersonajesModule ),
  },

  {
    path: '404',
    component: Error404PageComponent,
  },

  {
    path: '',
    redirectTo: 'personajes',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
