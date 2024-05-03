import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAlumnoPageRoutingModule } from './create-alumno-routing.module';

import { CreateAlumnoPage } from './create-alumno.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAlumnoPageRoutingModule
  ],
  declarations: [CreateAlumnoPage]
})
export class CreateAlumnoPageModule {}
