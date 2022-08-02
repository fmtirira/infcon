import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './pages/header/header/header.component';
import { ListarDirectivoComponent } from './pages/registro/listar-directivo.component';

import { TabsComponent } from './pages/header/menu/tabs/tabs.component';
import { ListarPresidenteComponent } from './pages/registro/listar-presidente/listar-presidente.component';

import { ListarRectorsecreComponent } from './pages/registro/listar-rectorsecre/listar-rectorsecre.component';
import { CrearDirectivoComponent} from './pages/registro/crear-directivo/crear-directivo.component';
import { CrearPresidenteComponent } from './pages/registro/crear-presidente/crear-presidente.component';
import { CrearInstitucionComponent } from './pages/registro/crear-institucion/crear-institucion.component';
import { CrearRectorsecreComponent } from './pages/registro/crear-rectorsecre/crear-rectorsecre.component';
import { EditarDirectivoComponent } from './pages/registro/editar/editar-directivo/editar-directivo.component';
import { EditarRectorsecreComponent } from './pages/registro/editar/editar-rectorsecre/editar-rectorsecre.component';
import { EditarPresidenteComponent } from './pages/registro/editar/editar-presidente/editar-presidente.component';

import { ToastrModule } from 'ngx-toastr';
import { AccordionModule } from 'primeng/accordion';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsuarioPerfilComponent } from './pages/usuario/usuario-perfil/usuario-perfil.component';
import { EditarPerfilComponent } from './pages/usuario/editar-perfil/editar-perfil.component';
import { InicioComponent } from './pages/rectorSecretario/inicio/inicio/inicio.component';
import { TabsrecComponent } from './pages/header/menu/rectorsecre/tabsrec/tabsrec.component';
import { EditarInstitucionComponent } from './pages/rectorSecretario/editar-institucion/editar-institucion.component';
import { EditarRepresentanteComponent } from './pages/rectorSecretario/representantes/editar-representante/editar-representante.component';
import { ListarRepresentantesComponent } from './pages/rectorSecretario/representantes/listar-representantes/listar-representantes.component';
import { CifrasAdministrativosComponent } from './pages/rectorSecretario/cifras/cifras-administrativos/cifras-administrativos.component';
import { CifrasDocentesComponent } from './pages/rectorSecretario/cifras/cifras-docentes/cifras-docentes.component';
import { CifrasEstudiantesComponent } from './pages/rectorSecretario/cifras/cifras-estudiantes/cifras-estudiantes.component';
import { VisualizarInstitucionesComponent } from './pages/directivo/visualizar-instituciones/visualizar-instituciones.component';
import { VisualizarRepresentantesComponent } from './pages/directivo/visualizar-representantes/visualizar-representantes.component';
import { VisualizarcifraEstudiantesComponent } from './pages/directivo/visualizarcifra-estudiantes/visualizarcifra-estudiantes.component';
import { VisualizarcifraDocentesComponent } from './pages/directivo/visualizarcifra-docentes/visualizarcifra-docentes.component';
import { VisualizarcifraAdministrativosComponent } from './pages/directivo/visualizarcifra-administrativos/visualizarcifra-administrativos.component';
import { DialogiConfirmarComponent } from './pages/registro/editar/dialogi-confirmar/dialogi-confirmar.component';
import { DialogpConfirmarComponent } from './pages/registro/editar/dialogp-confirmar/dialogp-confirmar.component';
import { DialogrecsecreConfirmarComponent } from './pages/registro/editar/dialogrecsecre-confirmar/dialogrecsecre-confirmar.component';
import { DialogdConfirmarComponent } from './pages/registro/editar/dialogd-confirmar/dialogd-confirmar.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { CrearRepresentanteComponent } from './pages/rectorSecretario/representantes/crear-representante/crear-representante.component';
import { DialogrepConfirmarComponent } from './pages/rectorSecretario/representantes/dialogrep-confirmar/dialogrep-confirmar.component';
import { TabsDirectivoComponent } from './pages/header/menu/tabs-directivo/tabs-directivo.component';
import { VisualizarPresidentesComponent } from './pages/directivo/visualizar-presidentes/visualizar-presidentes.component';
import { VisualizarListaInstitucionesComponent } from './pages/presidente/visualizar-lista-instituciones/visualizar-lista-instituciones.component';
import { VisualizarListaEstudiantesComponent } from './pages/presidente/visualizar-lista-estudiantes/visualizar-lista-estudiantes.component';
import { VisualizarListaDocentesComponent } from './pages/presidente/visualizar-lista-docentes/visualizar-lista-docentes.component';
import { VisualizarListaAdministrativosComponent } from './pages/presidente/visualizar-lista-administrativos/visualizar-lista-administrativos.component';
import { TabpresiComponent } from './pages/header/menu/tabpresi/tabpresi.component';
import { VisualizarListaRepresentantesComponent } from './pages/presidente/visualizar-lista-representantes/visualizar-lista-representantes.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ListarInstitucionComponent } from './pages/registro/listar-institucion/listar-institucion.component';
import { EditardInstitucionComponent } from './pages/registro/editar/editard-institucion/editard-institucion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    ListarDirectivoComponent,
    TabsComponent,
    ListarPresidenteComponent,
    ListarRectorsecreComponent,
    CrearDirectivoComponent,
    CrearPresidenteComponent,
    CrearInstitucionComponent,
    CrearRectorsecreComponent,
    EditarDirectivoComponent,
    EditarRectorsecreComponent,
    EditarPresidenteComponent,
    UsuarioPerfilComponent,
    EditarPerfilComponent,
    InicioComponent,
    TabsrecComponent,
    EditarInstitucionComponent,
    EditardInstitucionComponent,
    EditarRepresentanteComponent,
    ListarInstitucionComponent,
    ListarRepresentantesComponent,
    CifrasAdministrativosComponent,
    CifrasDocentesComponent,
    CifrasEstudiantesComponent,
    VisualizarInstitucionesComponent,
    VisualizarRepresentantesComponent,
    VisualizarcifraEstudiantesComponent,
    VisualizarcifraDocentesComponent,
    VisualizarcifraAdministrativosComponent,
    DialogiConfirmarComponent,
    DialogpConfirmarComponent,
    DialogrecsecreConfirmarComponent,
    DialogdConfirmarComponent,
    CrearRepresentanteComponent,
    DialogrepConfirmarComponent,
    TabsDirectivoComponent,
    VisualizarPresidentesComponent,
    VisualizarListaInstitucionesComponent,
    VisualizarListaEstudiantesComponent,
    VisualizarListaDocentesComponent,
    VisualizarListaAdministrativosComponent,
    TabpresiComponent,
    VisualizarListaRepresentantesComponent,
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    AccordionModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    DividerModule,
    MatTableExporterModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
