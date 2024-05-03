import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore, getDocs, limit, query, startAfter } 
from '@angular/fire/firestore';


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
  //listaProfesor = [];
  ngOnInit() {
    this.listarProfesor();
  }

  listarProfesorOld = () => {
    console.log("listar profesor");
    const profesorRef = collection(this.firestore, 'profesor');
    collectionData(profesorRef, { idField: 'id'}).subscribe(respuesta=>{
      console.log("estos son los profesor", respuesta);
      this.listaProfesor = respuesta;
    });
  }

  listarProfesor = () => {
    console.log("listar profesor");
    const alumnosRef = collection(this.firestore, 'profesor');
  collectionData(alumnosRef, { idField: 'id'}).subscribe(respuesta=>{
      console.log("estos son los profesor", respuesta);
      this.listaProfesor=respuesta; 
    });
  
  }


}
