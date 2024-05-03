import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscripcionCreatePageRoutingModule } from './inscripcion-create-routing.module';

import { CreateInscripcionPage } from './inscripcion-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    IonicModule,
    InscripcionCreatePageRoutingModule,
  ],
  declarations: [CreateInscripcionPage]
})
export class InscripcionCreatePageModule {}
