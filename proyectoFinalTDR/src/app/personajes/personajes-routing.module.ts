import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewpjPageComponent } from './pages/newpj-page/newpj-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { PersonajePageComponent } from './pages/personaje-page/personaje-page.component';
import { RankingPageComponent } from './pages/ranking-page/ranking-page.component';

// localhost:4200/personajes/
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'new-personaje',
        component: NewpjPageComponent,
      },

      {
        path: 'search',
        component: SearchPageComponent,
      },

      {
        path: 'edit/:id',
        component: NewpjPageComponent,
      },

      {
        path: 'list',
        component: ListPageComponent,
      },

      {
        path: 'ranking',
        component: RankingPageComponent,
      },
      
      {
        path: ':id',
        component: PersonajePageComponent,
      },

      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonajesRoutingModule {}
