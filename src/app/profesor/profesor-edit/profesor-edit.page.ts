import { Component, OnInit } from '@angular/core';
import { collection, addDoc, updateDoc, Firestore, doc, getDoc, deleteDoc } 
from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profesor-edit',
  templateUrl: './profesor-edit.page.html',
  styleUrls: ['./profesor-edit.page.scss'],
})
export class ProfesorEditPage implements OnInit {
  id: any;  //atributo que recibe el id del reg. desde la ruta
  isNew : boolean = false;
  profesor: any = {};
  
  constructor(
    private readonly firestore: Firestore,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) { }

  //metodo de la interfaz OnInit
  ngOnInit() {
    this.route.params.subscribe((params:any) => {
        console.log("params", params); 
        this.id = params.id;
        if (params.id == 'new') {
          this.isNew = true;
        } else {
          this.obtenerProfesor(this.id);
        }
    });
  }
  
  editarProfesor = () => {
    console.log("Aqui editar en firebase");
    const document = doc(this.firestore, "profesor", this.id);

    updateDoc(document, {
      codigo : this.profesor.codigo,
      nombre : this.profesor.nombre,
      apellido : this.profesor.apellido
    }).then(doc => {
      console.log("Registro Editado");
      this.presentSuccessAlert();
      this.router.navigate(['/profesor-list']);
    }).catch(error=>{
      console.error("Error al editar el registro", error);
    });
    
  }
//Mensaje de que ha guardado
  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Edición guardada con éxito',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  guardarProfesor() {
    if (this.validarCampos()) {
      if (this.isNew) {
        this.incluirProfesor();
      } else {
        this.editarProfesor();
      }
    } else {
      let errorMessage = '';
      if (!this.profesor.nombre || !this.profesor.apellido || !this.profesor.codigo) {
        errorMessage = 'Por favor, complete todos los campos.';
      }else if (!(/^\d+$/.test(this.profesor.codigo))) {
        errorMessage = 'Este campo debe ser un número positivo.';
      } else if (parseInt(this.profesor.codigo) < 0) {
        errorMessage = 'El código debe ser un número positivo.';
      }
      // Mostrar mensaje de error
      this.presentErrorAlert(errorMessage);
    }
  }
  
  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
  validarCampos(): boolean {
    return this.profesor.codigo && this.profesor.nombre && this.profesor.apellido && /^\d+$/.test(this.profesor.codigo);
  }

  isValidForm(): boolean {
    return this.profesor.codigo && this.profesor.nombre && this.profesor.apellido && /^\d+$/.test(this.profesor.codigo);
  }

  incluirProfesor = () => {
    console.log("Aqui incluir en firebase");
    let profesorRef = collection(this.firestore, "profesor");

    addDoc(profesorRef, {
      codigo : this.profesor.codigo,
      nombre : this.profesor.nombre,
      apellido : this.profesor.apellido
    }).then(doc => {
      console.log("Registro Incluido");
      this.presentSuccessAlert();
      this.router.navigate(['/profesor-list']);
    }).catch(error => {

    });
  }

async eliminarProfesor() {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de eliminar este registro?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Sí',
          handler: () => {
            // Eliminar el registro
            this.eliminarRegistro();
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarRegistro() {
    console.log("Aqui eliminar en firebase");
    const document = doc(this.firestore, "profesor", this.id);

    deleteDoc(document).then(doc => {
      console.log("Registro Eliminado");
      this.router.navigate(['/profesor-list']);
    }).catch(error => {
      console.error('Error al eliminar profesor:', error);
    });
  }


  obtenerProfesor = (id: string) => {
    const document = doc(this.firestore, "profesor", id);
    getDoc(document).then(doc => {
      console.log("Registro a editar", doc.data());
      this.profesor = doc.data();
    });
  }

}


