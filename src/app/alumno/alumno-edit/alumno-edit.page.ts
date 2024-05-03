import { Component, OnInit } from '@angular/core';
import { collection, addDoc, updateDoc, Firestore, doc, getDoc, deleteDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alumno-edit',
  templateUrl: './alumno-edit.page.html',
  styleUrls: ['./alumno-edit.page.scss'],
})
export class AlumnoEditPage implements OnInit {

  alumno: any = {};
  id: any;

  constructor(
    private route: ActivatedRoute,
    private readonly firestore: Firestore,
    private router: Router,
    private alertController: AlertController
  ) {}


  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log('params', params);
      this.id = params.id;
      this.obtenerAlumno(this.id);
    });
  }

  // Editar alumno
  editarAlumno = () => {
    console.log("Aqui editar firebase");
    const document = doc(this.firestore, "alumno", this.id);
    updateDoc(document, {
      codigo: this.alumno.codigo,
      nombre: this.alumno.nombre,
      apellido: this.alumno.apellido,
    }).then(doc => {
      console.log("Registro Editado")
      this.router.navigate(['/alumno-list']);
    }).catch(error => {
      console.error("Error al editar el registro", error);
    });
  }


  // Obtener alumno por ID
  obtenerAlumno = (id: string) => {
    console.log("Aqui editar firebase");
    const document = doc(this.firestore, "alumno", id);
    getDoc(document).then(doc => {
      console.log("Registro a editar", doc.data());
      this.alumno = doc.data();
    });
  }

  

}
