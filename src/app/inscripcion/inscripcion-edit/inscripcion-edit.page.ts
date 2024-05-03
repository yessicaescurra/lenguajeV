import { Component, OnInit } from '@angular/core';
import { collection, addDoc, updateDoc, Firestore, doc, getDoc, deleteDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-inscripcion-edit',
  templateUrl: './inscripcion-edit.page.html',
  styleUrls: ['./inscripcion-edit.page.scss'],
})
export class InscripcionEditPage implements OnInit {


  inscripcion: any = {};
  id: any;

  constructor(
    private route: ActivatedRoute,
    private readonly firestore: Firestore,
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController

  ) {}


  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log('params', params);
      this.id = params.id;
      this.obtenerInscripcion(this.id);
    });
  }

  // Editar Inscripcion
  editarInscripcion = () => {
    console.log("Aqui editar firebase");
    const document = doc(this.firestore, "inscripcion", this.id);
    updateDoc(document, {
      ci: this.inscripcion.ci,
      nombre: this.inscripcion.nombre,
      estado: this.inscripcion.estado,
      direccion: this.inscripcion.direccion,
      telefono: this.inscripcion.telefono,
      fecha: this.inscripcion.fecha,
    }).then(doc => {
      console.log("Registro Editado")
    });
  }

  // Obtener inscripcion por ID
  obtenerInscripcion = (id: string) => {
    console.log("Aqui editar firebase");
    const document = doc(this.firestore, "inscripcion", id);
    getDoc(document).then(doc => {
      console.log("Registro a editar", doc.data());
      this.inscripcion = doc.data();
    });
  }




}
