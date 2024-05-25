import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, limit, query, startAfter, where } from '@angular/fire/firestore';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-profesor-list',
  templateUrl: './profesor-list.page.html',
  styleUrls: ['./profesor-list.page.scss'],
})
export class ProfesorListPage implements OnInit {

  constructor(private readonly firestore: Firestore) { }

  listaProfesor = new Array();
  maxResults = 10;
  ultimoProfesorRecuperado: any = null;
  isSearch: boolean = false;
  query = "";
  registrosCargados = false;

  ngOnInit() {
    if (!this.registrosCargados) {
      this.listarProfesor();
    }
  }

  ionViewWillEnter() {
    if (!this.registrosCargados) {
      this.listarProfesor();
    }
  }

  listarProfesorSinFiltro = () => {
    const profesorRef = collection(this.firestore, 'profesor');

    let q;
    if (!this.ultimoProfesorRecuperado) {
      q = query(profesorRef, limit(this.maxResults));
    } else {
      q = query(profesorRef, limit(this.maxResults), startAfter(this.ultimoProfesorRecuperado));
    }
    getDocs(q).then(re => {
      let total = re.docs.length;

      if (!re.empty) {
        re.forEach(doc => {
          this.ultimoProfesorRecuperado = re.docs[re.docs.length - 1];
          let profesor: any = doc.data();
          profesor.id = doc.id;

          this.listaProfesor.push(profesor);
        });
      }
    });
  }

  listarProfesor = () => {
    const profesorRef = collection(this.firestore, 'profesor');

    if ((this.query + "").length > 0) {
      let q = undefined;
      if (this.ultimoProfesorRecuperado) {
        q = query(profesorRef,
          where("nombre", ">=", this.query.toUpperCase()),
          where("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.maxResults),
          startAfter(this.ultimoProfesorRecuperado));
      } else {
        q = query(profesorRef,
          where("nombre", ">=", this.query.toUpperCase()),
          where("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.maxResults));
      }

      getDocs(q).then(re => {
        if (!re.empty) {
          let nuevoArray = new Array();

          for (let i = 0; i < re.docs.length; i++) {
            const doc: any = re.docs[i].data();
            if (doc.nombre.toUpperCase().startsWith(this.query.toUpperCase().charAt(0))) {
              nuevoArray.push(re.docs[i])
            }
          }

          this.ultimoProfesorRecuperado = re.docs[nuevoArray.length - 1];
          for (let i = 0; i < nuevoArray.length; i++) {
            const doc: any = nuevoArray[i];
            let profesor: any = doc.data();
            profesor.id = doc.id;
            this.listaProfesor.push(profesor);

          }

        }
      });

    } else {
      this.listarProfesorSinFiltro();
    }

    this.registrosCargados = true; // Marcamos que los registros han sido cargados
  }

  onIonInfinite(ev: any) {
    this.listarProfesor();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  clickSearch = () => {
    this.isSearch = true;
  }

  clearSearch = () => {
    this.isSearch = false;
    this.query = "";

    this.listaProfesor = new Array();
    this.ultimoProfesorRecuperado = null;
    this.registrosCargados = false; // Marcamos que los registros deben volver a cargarse
    this.listarProfesor();
  }

  buscarSearch = (e: any) => {
    this.isSearch = false;
    this.query = e.target.value;

    this.listaProfesor = new Array();
    this.ultimoProfesorRecuperado = null;
    this.registrosCargados = false; // Marcamos que los registros deben volver a cargarse
    this.listarProfesor();
  }

}

