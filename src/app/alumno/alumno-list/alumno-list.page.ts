import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore, getDocs, limit, query, startAfter } from '@angular/fire/firestore';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { Router } from '@angular/router';
import { deleteDoc, doc } from 'firebase/firestore';


@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.page.html',
  styleUrls: ['./alumno-list.page.scss'],
})
export class AlumnoListPage implements OnInit {

  constructor(
    private readonly firestore: Firestore, 
    private alertController: AlertController,
    private router: Router
  ) {}


  listaAlumnos = new Array();
  listaAlumnosFiltrada = new Array();
  maxResults = 10;
  ultimoAlumnoRecuperado : any = null;
  filtro: string = '';
  showSearch = false;

  ngOnInit() {
    this.listarAlumnos();
    this.filtrarLista();
  }

  // Método para filtrar la lista de alumnos
  filtrarLista() {
    if (this.filtro) {
      this.listaAlumnosFiltrada = this.listaAlumnos.filter(alumno =>
        alumno.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
        alumno.apellido.toLowerCase().includes(this.filtro.toLowerCase())
      );
    } else {
      this.listaAlumnosFiltrada = this.listaAlumnos;
    }
    if (this.listaAlumnosFiltrada.length === 0) {
      console.log("No se encontraron resultados.");
    }
  }
  
  // Método para mostrar u ocultar el campo de búsqueda
  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.filtro = ''; // Limpiar el filtro cuando se oculta el campo de búsqueda
    }
    this.filtrarLista(); // Volver a filtrar la lista cuando se limpie el filtro
  }

  listarAlumnosOld = () => {
    console.log("listar alumnos");
    const alumnosRef = collection(this.firestore, 'alumno');
    collectionData(alumnosRef, {idField: 'id'}).subscribe(respuesta=>{
      console.log("Listado de alumnos", respuesta);
      this.listaAlumnos = respuesta;
    });
  }

  async confirmarEliminar(alumnoId: string) {
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
            this.eliminarAlumno(alumnoId);
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarAlumno = (alumnoId: string) => {
    const alumnoDoc = doc(this.firestore, 'alumno', alumnoId);
    deleteDoc(alumnoDoc)
      .then(() => {
        console.log('Alumno eliminado correctamente');
        // Actualizar la lista de alumnos después de eliminar
        this.listarAlumnos();
      })
      .catch(error => {
        console.error('Error al eliminar el alumno:', error);
      });
  }


  nuevoAlumno() {
    this.router.navigate(['/alumno-create']);
  }


  
  listarAlumnos = () => {
    console.log("listar alumnos");
    const alumnosRef = collection(this.firestore, 'alumno');
    
    let q;
    if (this.ultimoAlumnoRecuperado == null) {
      q = query(alumnosRef, limit(this.maxResults));
    } else {
      q = query(alumnosRef, limit(this.maxResults), startAfter(this.ultimoAlumnoRecuperado));
    }
    getDocs(q).then(re => {
      this.ultimoAlumnoRecuperado = re.docs[re.docs.length - 1];

      re.forEach(doc => {
        let alumno : any = doc.data();
        alumno.id = doc.id;
        this.listaAlumnos.push(alumno);
        console.log(this.listaAlumnos)
      });

    });
  }
  

  onIonInfinite(ev: any) {
    this.listarAlumnos();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }


}

