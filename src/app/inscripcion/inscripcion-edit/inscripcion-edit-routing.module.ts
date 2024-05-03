import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscripcionEditPage } from './inscripcion-edit.page';

const routes: Routes = [
  {
    path: '',
    component: InscripcionEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionEditPageRoutingModule {}
