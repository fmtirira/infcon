import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroDComponent } from './pages/registro/registroD.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HeaderComponent } from './pages/header/header/header.component';
import { LoginComponent } from './pages/login/login.component';

import { RegistropComponent } from './pages/registro/registrop/registrop.component';

import { RegistroinstitucionComponent } from './pages/registro/registroinstitucion/registroinstitucion.component';
import { RegistrorectorsecreComponent } from './pages/registro/registrorectorsecre/registrorectorsecre.component';
import { TabsComponent } from './pages/header/menu/admin/tabs/tabs.component';
import { DialogdeditarComponent } from './pages/registro/editar/dialogdeditar/dialogdeditar.component';
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

const routes: Routes = [
  { path: '', redirectTo: '/iniciarSesion', pathMatch: 'full' },
  { path: 'iniciarSesion', component: LoginComponent}, //esto me sirve para llamar a los componentes al router principal

  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'registrorectorsecre', component: RegistrorectorsecreComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registroinstitucion', component: RegistroinstitucionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registrop', component: RegistropComponent,
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
    path: 'registroD', component: RegistroDComponent,
    canActivate: [AuthGuard]
  },
  { path: 'tabs', redirectTo: '/iniciarSesion', pathMatch: 'full' },
  { path: 'header', redirectTo: '/iniciarSesion', pathMatch: 'full' },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  {
    path: 'dialogdeditar/:id', component: DialogdeditarComponent,
    canActivate: [AuthGuard]
  },
  { path: 'inicio', component: InicioComponent},
  { path: 'listar-representantes', component: ListarRepresentantesComponent, canActivate: [AuthGuard] },
  { path: 'editar-institucion', component: EditarInstitucionComponent, canActivate: [AuthGuard] },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'visualizar-instituciones', component: VisualizarInstitucionesComponent, canActivate: [AuthGuard] },
  { path: 'cifras-estudiantes', component: CifrasEstudiantesComponent, canActivate: [AuthGuard] },
  { path: 'cifras-docentes', component: CifrasDocentesComponent,canActivate: [AuthGuard] },
  { path: 'cifras-administrativos', component: CifrasAdministrativosComponent,canActivate: [AuthGuard] },
  

  { path: '**', redirectTo: '/iniciarSesion', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
