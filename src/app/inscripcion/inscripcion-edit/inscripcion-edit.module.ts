import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscripcionEditPageRoutingModule } from './inscripcion-edit-routing.module';

import { InscripcionEditPage } from './inscripcion-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscripcionEditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [InscripcionEditPage]
})
export class InscripcionEditPageModule {}
