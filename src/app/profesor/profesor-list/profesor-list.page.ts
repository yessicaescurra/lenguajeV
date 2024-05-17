import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, getDocs, limit, query, startAfter, where } from '@angular/fire/firestore';
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
  ultimoProfesorRecuperado :any = null;
  isSearch : boolean = false;
  query="";

  ngOnInit() {
    this.listarProfesor();
  }

 /* listarProfesor = () => {
    console.log("listar profesor");
    const profesorRef = collection(this.firestore, 'profesor');
  collectionData(profesorRef, { idField: 'id'}).subscribe(respuesta=>{
      console.log("estos son los profesor", respuesta);
      this.listaProfesor=respuesta; 
    });
  

  }*/

  listarProfesorSinFiltro = () => {
    console.log("listar profesor");
    const profesorRef = collection(this.firestore, 'profesor');

    let q;
    if (!this.ultimoProfesorRecuperado) {
      q = query(profesorRef, limit(this.maxResults));
    } else {
      q = query(profesorRef, limit(this.maxResults), startAfter(this.ultimoProfesorRecuperado));
    }
    getDocs(q).then(re => {
      let total= re.docs.length;

      if(!re.empty){
        re.forEach(doc => {
        this.ultimoProfesorRecuperado = re.docs[re.docs.length - 1];
        let profesor: any = doc.data();
        profesor.id = doc.id;

        this.listaProfesor.push(profesor);

        let cantidadAlu = this.listaProfesor.length;
          
        });

      }

    });

  }

  listarProfesor = () => {
    console.log("listar profesor");
    const profesorRef = collection(this.firestore, 'profesor');

    if ((this.query+"").length > 0){
      let q = undefined;
      if (this.ultimoProfesorRecuperado){
        q= query(profesorRef,
          where ("nombre", ">=", this.query.toUpperCase()),
          where ("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.maxResults),
          startAfter(this.ultimoProfesorRecuperado));
      } else {
        q= query(profesorRef,
          where ("nombre", ">=", this.query.toUpperCase()),
          where ("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.maxResults));
      }

      getDocs(q).then(re => {
        if (!re.empty){
          //this.stAt +=this.li;
          this.ultimoProfesorRecuperado = re.docs[re.docs.length-1];
            re.forEach(doc => {
              let profesor : any=doc.data();
              profesor.id = doc.id;
              this.listaProfesor.push(profesor);
            });

        }
      });

    } else {
      this.listarProfesorSinFiltro();
    }

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
    this.listarProfesor();
  }

  buscarSearch = (e:any) => {
    this.isSearch = false;
    this.query = e.target.value;

    this.listaProfesor = new Array();
    this.ultimoProfesorRecuperado = null;
    this.listarProfesor();
  }

}
