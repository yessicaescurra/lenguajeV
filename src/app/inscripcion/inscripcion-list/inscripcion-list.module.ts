import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscripcionListPageRoutingModule } from './inscripcion-list-routing.module';

import { InscripcionListPage } from './inscripcion-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscripcionListPageRoutingModule
  ],
  declarations: [InscripcionListPage]
})
export class InscripcionListPageModule {}
