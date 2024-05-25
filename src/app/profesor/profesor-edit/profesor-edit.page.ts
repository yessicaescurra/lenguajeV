import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { collection, addDoc, updateDoc, Firestore, doc, getDoc, deleteDoc, Timestamp } from '@angular/fire/firestore';
import { getDownloadURL, uploadBytesResumable, Storage, ref, deleteObject } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profesor-edit',
  templateUrl: './profesor-edit.page.html',
  styleUrls: ['./profesor-edit.page.scss'],
})
export class ProfesorEditPage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  id: any;  //atributo que recibe el id del reg. desde la ruta
  isNew: boolean = false;
  profesor: any = {};
  avatar: string = ''; // agregado 17.05
  fecha: Date = new Date();

  constructor(
    private readonly firestore: Firestore,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private storage: Storage
  ) { }

  //metodo de la interfaz OnInit
  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log("params", params);
      this.id = params.id;
      if (params.id == 'new') {
        this.isNew = true;
      } else {
        this.obtenerProfesor(this.id);
      }
    });
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const storageRef = ref(this.storage, `avatars/profesor/${this.id}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progreso de la carga (puedes manejarlo si lo deseas)
        },
        (error) => {
          console.error('Error al subir la imagen', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
            this.avatar = url;
            this.editarAvatar(url);
          });
        }
      );
    }
  }

  editarAvatar(url: string) {
    const document = doc(this.firestore, "profesor", this.id);
    updateDoc(document, {
      avatar: url
    }).then(() => {
      console.log("Avatar Editado");
    }).catch(error => {
      console.error("Error al editar avatar", error);
    });
  }

  editarProfesor = () => {
    console.log("Aqui editar en firebase");
    const document = doc(this.firestore, "profesor", this.id);

    updateDoc(document, {
      codigo: this.profesor.codigo,
      nombre: this.profesor.nombre,
      apellido: this.profesor.apellido,
      avatar: this.avatar,
      fecha : new Date(this.profesor.fecha)
    }).then(() => {
      console.log("Registro Editado");
      this.presentSuccessAlert();
      this.router.navigate(['/profesor-list']);
    }).catch(error => {
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
      } else if (!(/^\d+$/.test(this.profesor.codigo))) {
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
      codigo: this.profesor.codigo,
      nombre: this.profesor.nombre,
      apellido: this.profesor.apellido,
      avatar: this.avatar,
      fecha: new Date(this.profesor.fecha),
    }).then(() => {
      console.log("Registro Incluido");
      this.presentSuccessAlert();
      this.router.navigate(['/profesor-list']);
    }).catch(error => {
      console.error("Error al incluir profesor:", error);
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

    deleteDoc(document).then(() => {
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
      if (doc.data()) {
        this.profesor = doc.data();

        this.profesor.fecha = this.profesor.fecha.toDate()?.toISOString()
        .substring(0, 10)+"";
        //this.profesor.fecha = this.profesor.fecha.toISOString().substring(0, 10);

        if (this.profesor.avatar) {
         // this.avatar = this.profesor.avatar;
          this.obtenerAvatarProfesor();
        }else{
          this.profesor = {};
        }
      }
    }).catch(error => {
      console.error("Error al obtener profesor", error);
    });
  }


 obtenerAvatarProfesor = () => {
  const storageRef = ref(this.storage, `avatars/profesor/${this.id}`);
  getDownloadURL(storageRef).then(doc => {
    this.avatar = doc;
   });

  }


  async eliminarAvatar() {
    if (!this.avatar) return;

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de eliminar este avatar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Eliminar el avatar
            this.confirmarEliminacionAvatar();
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmarEliminacionAvatar() {
    const storageRef = ref(this.storage, `avatars/profesor/${this.id}`);
    deleteObject(storageRef).then(() => {
      console.log("Avatar eliminado del storage");

      const document = doc(this.firestore, "profesor", this.id);
      updateDoc(document, {
        avatar: null
      }).then(() => {
        console.log("Campo avatar actualizado a null en Firestore");
        this.avatar = '';
      }).catch(error => {
        console.error("Error al actualizar el avatar en Firestore", error);
      });
    }).catch(error => {
      console.error("Error al eliminar avatar del storage", error);
    });
  }

}
