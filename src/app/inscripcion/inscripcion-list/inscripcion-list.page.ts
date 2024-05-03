import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore, doc, deleteDoc } from '@angular/fire/firestore'; 
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inscripcion-list',
  templateUrl: './inscripcion-list.page.html',
  styleUrls: ['./inscripcion-list.page.scss'],
})
export class InscripcionListPage implements OnInit {

  constructor(
    private readonly firestore: Firestore, 
    private alertController: AlertController,
    private router: Router) { }


  listaInscripcion = new Array();

  ngOnInit() {
    this.listarInscripcion();
  }

  listarInscripcion = () => {
    console.log("Listar inscripcion");
    const inscripcionRef = collection(this.firestore, 'inscripcion');
    collectionData(inscripcionRef, {idField: 'id'}).subscribe(respuesta=>{
      console.log("Listado de incripciones", respuesta);
      this.listaInscripcion = respuesta;
    });
  }

  async confirmarEliminar(inscripcionId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Quieres eliminar este registro?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Sí',
          handler: () => {
            console.log('Eliminado');
            this.eliminarInscripcion(inscripcionId);
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarInscripcion = (inscripcionId: string) => {
    const inscripcionDoc = doc(this.firestore, 'inscripcion', inscripcionId);
    deleteDoc(inscripcionDoc)
      .then(() => {
        console.log('Inscripcion eliminado correctamente');
        // Actualizar la lista de inscripcion después de eliminar
        this.listarInscripcion();
      })
      .catch(error => {
        console.error('Error al eliminar el inscripcion:', error);
      });
  }


  nuevaInscripcion() {
    // Navegar a la página de creación de nuevos registros
    this.router.navigate(['/inscripcion-create']);
  }

}
