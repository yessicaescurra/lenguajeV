import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Alumnos', url: '/alumno-list', icon: 'person' },
    { title: 'Inscripcion', url: '/inscripcion-list', icon: 'person' },
    { title: 'Profesor', url: '/profesor-list', icon: 'person' },
  ];
  public labels = ['Institucion'];
  constructor() {}
}
