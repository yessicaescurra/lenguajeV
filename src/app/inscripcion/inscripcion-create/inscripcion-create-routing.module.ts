import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateInscripcionPage } from './inscripcion-create.page';

const routes: Routes = [
  {
    path: '',
    component: CreateInscripcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionCreatePageRoutingModule {}
