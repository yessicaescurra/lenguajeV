import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscripcionListPage } from './inscripcion-list.page';

const routes: Routes = [
  {
    path: '',
    component: InscripcionListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionListPageRoutingModule {}
