import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },

  {
    path: 'alumno-edit',
    loadChildren: () => import('./alumno/alumno-edit/alumno-edit.module').then( m => m.
      AlumnoEditPageModule)
  },

  {
    path: 'alumno-edit/:id',
    loadChildren: () => import('./alumno/alumno-edit/alumno-edit.module').then( m => m.
      AlumnoEditPageModule)
  },
  {
    path: 'alumno-list',
    loadChildren: () => import('./alumno/alumno-list/alumno-list.module').then( m => m.
      AlumnoListPageModule)
  },
    // Nueva ruta para la página de creación de nuevos registros
  {
      path: 'alumno-create',
      loadChildren: () => import('./alumno/create-alumno/create-alumno.module').then( m => m.
        CreateAlumnoPageModule)
  },
  {
    path: 'create-alumno',
    loadChildren: () => import('./alumno/create-alumno/create-alumno.module').then( m => m.CreateAlumnoPageModule)
  },
  //Modulo inscripción
  {
    path: 'inscripcion-list',
    loadChildren: () => import('./inscripcion/inscripcion-list/inscripcion-list.module').then( m => m.InscripcionListPageModule)
  },
  {
    path: 'inscripcion-edit/:id',
    loadChildren: () => import('./inscripcion/inscripcion-edit/inscripcion-edit.module').then( m => m.InscripcionEditPageModule)
  },
  {
    path: 'inscripcion-create',
    loadChildren: () => import('./inscripcion/inscripcion-create/inscripcion-create.module').then( m => m.InscripcionCreatePageModule)
  },

  //Modulo Profesor

  {
    path: 'profesor-edit/:id',
    loadChildren: () => import('./profesor/profesor-edit/profesor-edit.module').then( m => m.ProfesorEditPageModule)
  },
  {
    path: 'profesor-list',
    loadChildren: () => import('./profesor/profesor-list/profesor-list.module').then( m => m.ProfesorListPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
