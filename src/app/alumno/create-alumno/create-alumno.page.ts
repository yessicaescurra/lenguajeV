import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-alumno',
  templateUrl: './create-alumno.page.html',
  styleUrls: ['./create-alumno.page.scss'],
})
export class CreateAlumnoPage implements OnInit {

  alumno: any = {
    codigo: '',
    nombre: '',
    apellido: ''
  };

  constructor(private readonly firestore: Firestore, private router: Router) { }

  ngOnInit() {
  }

  crearAlumno() {
    console.log("registrando alumno...");
    const alumnosRef = collection(this.firestore, 'alumno');
    addDoc(alumnosRef, this.alumno)
      .then(() => {
        console.log("Alumno creado correctamente");
        // Redirigir a la lista de alumnos después de la creación
        this.router.navigate(['/alumno-list']);
      })
      .catch(error => {
        console.error("Error al crear alumno:", error);
      });
  }

}

