import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './pages/header/header/header.component';
import { RegistroDComponent } from './pages/registro/registroD.component';

import { TabsComponent } from './pages/header/menu/admin/tabs/tabs.component';
import { RegistropComponent } from './pages/registro/registrop/registrop.component';

import { RegistroinstitucionComponent } from './pages/registro/registroinstitucion/registroinstitucion.component';
import { RegistrorectorsecreComponent } from './pages/registro/registrorectorsecre/registrorectorsecre.component';
import { DialogdComponent } from './pages/registro/dialogd/dialogd.component';
import { DialogpComponent } from './pages/registro/dialogp/dialogp.component';
import { DialogiComponent } from './pages/registro/dialogi/dialogi.component';
import { DialogrecsecreComponent } from './pages/registro/dialogrecsecre/dialogrecsecre.component';
import { DialogdeditarComponent } from './pages/registro/editar/dialogdeditar/dialogdeditar.component';
import { DialogrecseceditarComponent } from './pages/registro/editar/dialogrecseceditar/dialogrecseceditar.component';
import { FilterPipe } from './pages/pipes/filter.pipe';
import { DialogpeditarComponent } from './pages/registro/editar/dialogpeditar/dialogpeditar.component';

import{ToastrModule} from 'ngx-toastr';
import {AccordionModule} from 'primeng/accordion';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UsuarioComponent } from './pages/usuario/usuario/usuario.component';
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
import { MatConfirmDialogComponent } from './pages/header/mat-confirm-dialog/mat-confirm-dialog.component';
import { DialogieditarComponent } from './pages/registro/editar/dialogieditar/dialogieditar.component';
import { DialogiConfirmarComponent } from './pages/registro/editar/dialogi-confirmar/dialogi-confirmar.component';
import { DialogpConfirmarComponent } from './pages/registro/editar/dialogp-confirmar/dialogp-confirmar.component';
import { DialogrecsecreConfirmarComponent } from './pages/registro/editar/dialogrecsecre-confirmar/dialogrecsecre-confirmar.component';
import { DialogdConfirmarComponent } from './pages/registro/editar/dialogd-confirmar/dialogd-confirmar.component';
import { DialognivelComponent } from './pages/rectorSecretario/dialognivel/dialognivel.component';
import { MatMenuItem } from '@angular/material/menu';

import {ButtonModule} from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CifrasdocentesEditarComponent } from './pages/rectorSecretario/cifras/cifrasdocentes-editar/cifrasdocentes-editar.component';
import { CrearRepresentanteComponent } from './pages/rectorSecretario/representantes/crear-representante/crear-representante.component';
import { DialogrepConfirmarComponent } from './pages/rectorSecretario/representantes/dialogrep-confirmar/dialogrep-confirmar.component';
import { TabsDirectivoComponent } from './pages/header/menu/director/tabs-directivo/tabs-directivo.component';
import { VisualizarPresidentesComponent } from './pages/directivo/visualizar-presidentes/visualizar-presidentes.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    RegistroDComponent,
    TabsComponent,
    RegistropComponent,
    RegistroinstitucionComponent,
    RegistrorectorsecreComponent,
    DialogdComponent,
    DialogpComponent,
    DialogiComponent,
    DialogrecsecreComponent,
    DialogdeditarComponent,
    DialogrecseceditarComponent,
    FilterPipe,
    DialogpeditarComponent,
    UsuarioComponent,
    UsuarioPerfilComponent,
    EditarPerfilComponent,
    InicioComponent,
    TabsrecComponent,
    EditarInstitucionComponent,
    EditarRepresentanteComponent,
    RegistroinstitucionComponent,
    ListarRepresentantesComponent,
    CifrasAdministrativosComponent,
    CifrasDocentesComponent,
    CifrasEstudiantesComponent,
    VisualizarInstitucionesComponent,
    VisualizarRepresentantesComponent,
    VisualizarcifraEstudiantesComponent,
    VisualizarcifraDocentesComponent,
    VisualizarcifraAdministrativosComponent,
    MatConfirmDialogComponent,
    DialogieditarComponent,
    DialogiConfirmarComponent,
    DialogpConfirmarComponent,
    DialogrecsecreConfirmarComponent,
    DialogdConfirmarComponent,
    DialognivelComponent,
    CifrasdocentesEditarComponent,
    CrearRepresentanteComponent,
    DialogrepConfirmarComponent,
    TabsDirectivoComponent,
    VisualizarPresidentesComponent   
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

  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
