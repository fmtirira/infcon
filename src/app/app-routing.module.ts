import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarDirectivoComponent } from './pages/registro/listar-directivo.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HeaderComponent } from './pages/header/header/header.component';
import { LoginComponent } from './pages/login/login.component';

import { ListarPresidenteComponent } from './pages/registro/listar-presidente/listar-presidente.component';

import { ListarInstitucionComponent } from './pages/registro/listar-institucion/listar-institucion.component';
import { ListarRectorsecreComponent } from './pages/registro/listar-rectorsecre/listar-rectorsecre.component';
import { TabsComponent } from './pages/header/menu/tabs/tabs.component';
import { EditarDirectivoComponent } from './pages/registro/editar/editar-directivo/editar-directivo.component';
import { InicioComponent } from './pages/rectorSecretario/inicio/inicio/inicio.component';
import { ListarRepresentantesComponent } from './pages/rectorSecretario/representantes/listar-representantes/listar-representantes.component';
import { EditarInstitucionComponent } from './pages/rectorSecretario/editar-institucion/editar-institucion.component';
import { CifrasEstudiantesComponent } from './pages/rectorSecretario/cifras/cifras-estudiantes/cifras-estudiantes.component';
import { CifrasDocentesComponent } from './pages/rectorSecretario/cifras/cifras-docentes/cifras-docentes.component';
import { CifrasAdministrativosComponent } from './pages/rectorSecretario/cifras/cifras-administrativos/cifras-administrativos.component';
import { AuthGuard } from './guards/auth.guard';
import { VisualizarInstitucionesComponent } from './pages/directivo/visualizar-instituciones/visualizar-instituciones.component';
import { VisualizarPresidentesComponent } from './pages/directivo/visualizar-presidentes/visualizar-presidentes.component';
import { VisualizarcifraDocentesComponent } from './pages/directivo/visualizarcifra-docentes/visualizarcifra-docentes.component';
import { VisualizarcifraEstudiantesComponent } from './pages/directivo/visualizarcifra-estudiantes/visualizarcifra-estudiantes.component';
import { VisualizarcifraAdministrativosComponent } from './pages/directivo/visualizarcifra-administrativos/visualizarcifra-administrativos.component';
import { VisualizarRepresentantesComponent } from './pages/directivo/visualizar-representantes/visualizar-representantes.component';
import { VisualizarListaAdministrativosComponent } from './pages/presidente/visualizar-lista-administrativos/visualizar-lista-administrativos.component';
import { VisualizarListaDocentesComponent } from './pages/presidente/visualizar-lista-docentes/visualizar-lista-docentes.component';
import { VisualizarListaEstudiantesComponent } from './pages/presidente/visualizar-lista-estudiantes/visualizar-lista-estudiantes.component';
import { VisualizarListaInstitucionesComponent } from './pages/presidente/visualizar-lista-instituciones/visualizar-lista-instituciones.component';
import { VisualizarListaRepresentantesComponent } from './pages/presidente/visualizar-lista-representantes/visualizar-lista-representantes.component';
import { AdministradorGuard } from './guards/administrador.guard';
import { UsuarioPerfilComponent } from './pages/usuario/usuario-perfil/usuario-perfil.component';

const routes: Routes = [
  { path: '', redirectTo: '/iniciarSesion', pathMatch: 'full' },
  { path: 'iniciarSesion', component: LoginComponent }, //esto me sirve para llamar a los componentes al router principal

  {
    path: 'listar-rectorsecre', component: ListarRectorsecreComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listar-institucion', component: ListarInstitucionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listar-presidente', component: ListarPresidenteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'visualizarcifra-docentes', component: VisualizarcifraDocentesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'visualizarcifra-estudiantes', component: VisualizarcifraEstudiantesComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'visualizar-representantes', component: VisualizarRepresentantesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'visualizarcifra-administrativos', component: VisualizarcifraAdministrativosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'visualizar-presidentes', component: VisualizarPresidentesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listar-directivo', component: ListarDirectivoComponent,
    canActivate: [AuthGuard]
  },
  { path: 'tabs', redirectTo: '/iniciarSesion', pathMatch: 'full' },
  { path: 'login', redirectTo: '/iniciarSesion', pathMatch: 'full' },
  { path: 'header', redirectTo: '/iniciarSesion', pathMatch: 'full' },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  {
    path: 'editar-directivo/:id', component: EditarDirectivoComponent,
    canActivate: [AuthGuard]
  },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'listar-representantes', component: ListarRepresentantesComponent, canActivate: [AuthGuard] },
  { path: 'visualizar-lista-administrativos', component: VisualizarListaAdministrativosComponent, canActivate: [AuthGuard] },
  { path: 'visualizar-lista-docentes', component: VisualizarListaDocentesComponent, canActivate: [AuthGuard] },
  { path: 'visualizar-lista-estudiantes', component: VisualizarListaEstudiantesComponent, canActivate: [AuthGuard] },
  { path: 'visualizar-lista-instituciones', component: VisualizarListaInstitucionesComponent, canActivate: [AuthGuard] },
  { path: 'visualizar-lista-representantes', component: VisualizarListaRepresentantesComponent, canActivate: [AuthGuard] },

  {
    path: 'editar-institucion', component: EditarInstitucionComponent, canActivate: [AuthGuard, AdministradorGuard], 
  },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'visualizar-instituciones', component: VisualizarInstitucionesComponent, canActivate: [AuthGuard] },
  { path: 'cifras-estudiantes', component: CifrasEstudiantesComponent, canActivate: [AuthGuard] },
  { path: 'cifras-docentes', component: CifrasDocentesComponent, canActivate: [AuthGuard] },
  { path: 'cifras-administrativos', component: CifrasAdministrativosComponent, canActivate: [AuthGuard] },
  { path: 'usuario-perfil', component: UsuarioPerfilComponent, canActivate: [AuthGuard] },
  

  { path: '**', redirectTo: '/iniciarSesion', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
