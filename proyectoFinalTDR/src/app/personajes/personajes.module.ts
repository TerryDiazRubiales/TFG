import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PersonajesRoutingModule } from './personajes-routing.module';
import { MaterialModule } from '../material/material.module';

import { PersonajePageComponent } from './pages/personaje-page/personaje-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewpjPageComponent } from './pages/newpj-page/newpj-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CardComponent } from './components/card/card.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';




@NgModule({
  declarations: [
    PersonajePageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewpjPageComponent,
    SearchPageComponent,
    CardComponent,
    ConfirmDialogComponent,

    //pipe
    // PersonajeImagePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PersonajesRoutingModule,
    MaterialModule
  ]
})
export class PersonajesModule { }
