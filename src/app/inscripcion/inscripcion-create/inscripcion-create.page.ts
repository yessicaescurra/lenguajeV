import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { format } from 'date-fns';

@Component({
  selector: 'app-inscripcion-create',
  templateUrl: './inscripcion-create.page.html',
  styleUrls: ['./inscripcion-create.page.scss'],
})
export class CreateInscripcionPage implements OnInit {

  inscripcion: any = {
    ci: '',
    nombre: '',
    estado: '',
    direccion: '',
    telefono: '',
    fecha:''
  };

  constructor(
    private readonly firestore: Firestore, 
    private router: Router

    ) { }

  ngOnInit() {
    this.actualizarFechaActual();
  }

  actualizarFechaActual() {
    this.inscripcion.fecha = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }


  crearInscripcion() {
    console.log("registrando inscripcion...");
    const inscripcionRef = collection(this.firestore, 'inscripcion');
    addDoc(inscripcionRef, this.inscripcion)
      .then(() => {
        console.log("Inscripcion creado correctamente");
        // Redirigir a la lista de inscripcion después de la creación
        this.router.navigate(['/inscripcion-list']);
      })
      .catch(error => {
        console.error("Error al crear inscripcion:", error);
      });
  }

}
