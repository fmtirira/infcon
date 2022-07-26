import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CifrasDocentesI } from 'src/app/models/cifrasDocentes.interface';
import { CifrasEstudiantesI } from 'src/app/models/cifrasEstudiantes.interface';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { InmuebleEdificioI, JornadaI, JurisdiccionI, ModalidadI, NivelGroupI, SostenimientoI, TipoEducacionI, ZonaInecI } from 'src/app/models/nivelEducacion.interface';
import { Provincias } from 'src/app/models/provincia.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CifraEstudianteService } from 'src/app/services/cifra-estudiante.service';
import { CifrasEstudiantesService } from 'src/app/services/cifras-estudiantes.service';
import { InstitucionesService } from 'src/app/services/instituciones.service';
import { NivelesService } from 'src/app/services/niveles.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { UsurectorsecreService } from 'src/app/services/usurectorsecre.service';

@Component({
  selector: 'app-editar-institucion',
  templateUrl: './editar-institucion.component.html',
  styleUrls: ['./editar-institucion.component.css'],
  providers: [ProvinciaService]
})
export class EditarInstitucionComponent implements OnInit {
  activar = false;
  private photo: any;
  @ViewChild('fileInput') archivo!: ElementRef;
  photoUrl: any = 'https://firebasestorage.googleapis.com/v0/b/bdinfcon.appspot.com/o/school.png?alt=media&token=c3c27823-9b17-439d-b9ce-4c9fa8eaed5a';
  file: any;
  private SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  private provincias: Provincias[] = [];
  public nivelesEducacion: NivelGroupI[] = [];
  public niveDocentes!: NivelGroupI;
  public tipoEducacion: TipoEducacionI[] = [];
  public sostenimientos: SostenimientoI[] = [];
  public zonasInec: ZonaInecI[] = [];
  public jurisdicciones: JurisdiccionI[] = [];
  public inmuebleEdi: InmuebleEdificioI[] = [];
  public jornadas: JornadaI[] = [];
  public modalidades: ModalidadI[] = [];
  public infoCifrasEstudiantes: CifrasEstudiantesI[] = [];


  datosInstitucion: InstitucionesI = {
    idInstitucion: '',
    codigoAMIE: '',
    logo: '',
    nomInstitucion: '',
    direccionInstitucion: '',
    jornada: '',
    jurisdiccion: '',
    modalidad: '',
    tipoEducacio: '',
    sostenimiento: '',
    tenenciaEdificio: '',
    zonaInec: '',
    nomProvincia: '',
    nivelEducacion: '',
    cifrasAdministrativos: '',
  }
  datosCifrasEstudiantes: CifrasEstudiantesI = {
    uid: '',
    id: '',
    idInstitucion: '',
    nomInstitucion: '',
    nomNivelEducacion: '',
    nomProvincia: '',
    hombres: 0,
    mujeres: 0,
    total: 0
  }
  datosCifrasDocentes: CifrasDocentesI = {
    uid: '',
    id: '',
    idInstitucion: '',
    nomInstitucion: '',
    nomNivelEducacion: '',
    nomProvincia: '',
    hombres: 0,
    mujeres: 0,
    total: 0
  }

  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  editarInstitucionForm = new FormGroup({
    idInstitucion: new FormControl(null),
    codigoAMIE: new FormControl('', Validators.required),
    logo: new FormControl(null),
    nomInstitucion: new FormControl('', Validators.required),
    direccionInstitucion: new FormControl('', Validators.required),
    jornada: new FormControl('', Validators.required),
    jurisdiccion: new FormControl('', Validators.required),
    modalidad: new FormControl('', Validators.required),
    tipoEducacio: new FormControl('', Validators.required),
    sostenimiento: new FormControl('', Validators.required),
    tenenciaEdificio: new FormControl('', Validators.required),
    zonaInec: new FormControl('', Validators.required),
    nomProvincia: new FormControl('', Validators.required),
    nivelEducacion: new FormControl('', Validators.required)
  });

  uid: any = ''; //uid del Usuario

  info!: Usuarios; //me permite traer la info a la vista
  infoInstitucion!: InstitucionesI;
  nivelesSelected!: any[];
  jornadaSelected!: any[];
  modalidadSelected!: any[];

  constructor(
    public dialog: MatDialog,
    public instiService: InstitucionesService,
    public cifrasEService: CifrasEstudiantesService,
    public cifraEService: CifraEstudianteService,
    private toastr: ToastrService,
    private router: Router,
    public nivelesSvc: NivelesService,
    public provinciaSvc: ProvinciaService,
    public authService: AuthService,
    public usuRectorSecreSvc: UsurectorsecreService,
    public afs: AngularFirestore
  ) {
    this.authService.StateUser().subscribe(idA => {
      if (idA) {
        this.getUid();
      }
    });
  }

  ngOnInit() {
    this.modalidades = this.nivelesSvc.GetModalidad();
    this.jornadas = this.nivelesSvc.GetJornada();
    this.inmuebleEdi = this.nivelesSvc.GetInmuebleEdi();
    this.zonasInec = this.nivelesSvc.GetZonaInec();
    this.tipoEducacion = this.nivelesSvc.GetTiposEducacion();
    this.sostenimientos = this.nivelesSvc.GetSostenimiento();
    this.jurisdicciones = this.nivelesSvc.GetJurisdiccion();
    this.nivelesEducacion = this.nivelesSvc.GetNiveles();
    this.provincias = this.provinciaSvc.GetProvincias();

  }

  async getUid() {
    const uid = await this.authService.GetUid();
    if (uid) {
      this.uid = uid;
      this.getInfoUser();
    } else {
      console.log('no existe uid');
    }
  }
  //traer un solo usuario
  GetInstitucionById(idInstitucion: any) {
    return this.afs.collection('Instituciones')
      .doc(idInstitucion)
      .valueChanges();
  }

  getInfoUser() {
    const path = 'Usuarios';
    const id = this.uid;
    this.getDoc<Usuarios>(path, id).subscribe(res => {
      if (res) {
        if (res.roles === 'secretarioRector') {
          this.activar = true;
        }
        else {
          this.activar = false;
          this.router.navigate(['/inicio']);
        }
        this.info = res;
        const pathI = 'Instituciones';
        this.getDoc<InstitucionesI>(pathI, this.info.idInstitucion).subscribe(resInsti => {
          if (resInsti) {
            this.infoInstitucion = resInsti;
            this.editarInstitucionForm.get('idInstitucion')?.setValue(this.infoInstitucion.idInstitucion);
            this.editarInstitucionForm.get('codigoAMIE')?.setValue(this.infoInstitucion.codigoAMIE);
            this.editarInstitucionForm.get('nomInstitucion')?.setValue(this.infoInstitucion.nomInstitucion);
            this.editarInstitucionForm.get('logo')?.setValue(this.infoInstitucion.logo);
            this.editarInstitucionForm.get('nomProvincia')?.setValue(this.infoInstitucion.nomProvincia);
            this.editarInstitucionForm.get('direccionInstitucion')?.setValue(this.infoInstitucion.direccionInstitucion);
            this.editarInstitucionForm.get('jornada')?.setValue(this.infoInstitucion.jornada);
            this.editarInstitucionForm.get('jurisdiccion')?.setValue(this.infoInstitucion.jurisdiccion);
            this.editarInstitucionForm.get('modalidad')?.setValue(this.infoInstitucion.modalidad);
            this.editarInstitucionForm.get('tipoEducacio')?.setValue(this.infoInstitucion.tipoEducacio);
            this.editarInstitucionForm.get('sostenimiento')?.setValue(this.infoInstitucion.sostenimiento);
            this.editarInstitucionForm.get('tenenciaEdificio')?.setValue(this.infoInstitucion.tenenciaEdificio);
            this.editarInstitucionForm.get('zonaInec')?.setValue(this.infoInstitucion.zonaInec);
            this.editarInstitucionForm.get('nivelEducacion')?.setValue(this.infoInstitucion.nivelEducacion);
            this.file = this.infoInstitucion.logo;
            this.photoUrl = this.infoInstitucion.logo;
          }
        });
      }
    });
  }
  ModalidadVal(val: any) {
    this.modalidadSelected = val;
  }
  JornadaVal(val: any) {
    this.jornadaSelected = val;
  }
  NivelEducacionVal(val: any) {
    const docentes = [];
    this.nivelesSelected = val;
  }

  async OnSaveInsti(data: InstitucionesI) {

    data.nomInstitucion = data.nomInstitucion?.toLowerCase();

    const path = 'CifrasEstudiantes';
    const idInstitucion = this.cifrasEService.arrayCifrasEstudiantes.filter(filtroIdInstitucion => {
      return filtroIdInstitucion.idInstitucion === data.idInstitucion;
    });
    for (let i = 0; i < data.nivelEducacion.length; i++) {
      if (data.nivelEducacion[i] === 'anios3') {
        if (idInstitucion) {
          const anios3 = idInstitucion.find(filtroIdNiv => {
            return filtroIdNiv.id === 'anios3';
          });
          if (anios3) {
            //console.log('existe id niv anios 3', anios3);
          }
          else {
            const uidN = this.authService.GetId();
            this.datosCifrasEstudiantes.uid = uidN;
            this.datosCifrasEstudiantes.id = "anios3";
            this.datosCifrasEstudiantes.nomNivelEducacion = "3 Años";
            this.datosCifrasEstudiantes.idInstitucion = data.idInstitucion;
            this.datosCifrasEstudiantes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasEstudiantes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasEstudiantes, path, uidN).then(() => {
              //console.log('creacion de documento', this.datosCifrasEstudiantes);
            });
          }
        }
      }

      if (data.nivelEducacion[i] === 'anios4') {
        if (idInstitucion) {
          const anios4 = idInstitucion.find(filtroIdNiv => {
            return filtroIdNiv.id === 'anios4';
          });
          if (anios4) {
            //console.log('existe id niv anios 4', anios4);
          }
          else {
            const uidN = this.authService.GetId();
            this.datosCifrasEstudiantes.uid = uidN;
            this.datosCifrasEstudiantes.id = "anios4";
            this.datosCifrasEstudiantes.nomNivelEducacion = "4 Años";
            this.datosCifrasEstudiantes.idInstitucion = data.idInstitucion;
            this.datosCifrasEstudiantes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasEstudiantes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasEstudiantes, path, uidN).then(() => {

            });
          }
        }
      }

      if (data.nivelEducacion[i] === 'basica1') {
        if (idInstitucion) {

          const basica1 = idInstitucion.find(filtroIdNiv => {
            return filtroIdNiv.id === 'basica1';
          });
          if (basica1) {
            //console.log('existe id niv basica 1', basica1);
          }
          else {
            const uidN = this.authService.GetId(); //uid del documento de la colleccion cifrasEstudiantes
            this.datosCifrasEstudiantes.uid = uidN;
            this.datosCifrasEstudiantes.id = "basica1";
            this.datosCifrasEstudiantes.nomNivelEducacion = "1 Básica";
            this.datosCifrasEstudiantes.idInstitucion = data.idInstitucion;
            this.datosCifrasEstudiantes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasEstudiantes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasEstudiantes, path, uidN).then(() => {

            });
            const uidND = this.authService.GetId();//uid del documento de la colleccion cifrasDocentes
            this.datosCifrasDocentes.uid = uidND;
            this.datosCifrasDocentes.id = "inicial1";
            this.datosCifrasDocentes.nomNivelEducacion = "Inicial";
            this.datosCifrasDocentes.idInstitucion = data.idInstitucion;
            this.datosCifrasDocentes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasDocentes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasDocentes, 'CifrasDocentes', uidND).then(() => {

            });
          }
        }
      }

      if (data.nivelEducacion[i] === 'basica2') {
        if (idInstitucion) {

          const basica2 = idInstitucion.find(filtroIdNiv => {
            return filtroIdNiv.id === 'basica2';
          });
          if (basica2) {
            //console.log('existe id niv basica 2', basica2);
          }
          else {
            const uidN = this.authService.GetId();
            this.datosCifrasEstudiantes.uid = uidN;
            this.datosCifrasEstudiantes.id = "basica2";
            this.datosCifrasEstudiantes.nomNivelEducacion = "2 Básica";
            this.datosCifrasEstudiantes.idInstitucion = data.idInstitucion;
            this.datosCifrasEstudiantes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasEstudiantes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasEstudiantes, path, uidN).then(() => {

            });
            const uidND = this.authService.GetId();//uid del documento de la colleccion cifrasDocentes
            this.datosCifrasDocentes.uid = uidND;
            this.datosCifrasDocentes.id = "preparatoria2";
            this.datosCifrasDocentes.nomNivelEducacion = "Preparatoria";
            this.datosCifrasDocentes.idInstitucion = data.idInstitucion;
            this.datosCifrasDocentes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasDocentes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasDocentes, 'CifrasDocentes', uidND).then(() => {

            });
          }
        }
      }

      if (data.nivelEducacion[i] === 'basica3') {
        if (idInstitucion) {
          const basica3 = idInstitucion.find(filtroIdNiv => {
            return filtroIdNiv.id === 'basica3';
          });
          if (basica3) {
            //console.log('existe id niv basica 3', basica3);
          }
          else {
            const uidN = this.authService.GetId();
            this.datosCifrasEstudiantes.uid = uidN;
            this.datosCifrasEstudiantes.id = "basica3";
            this.datosCifrasEstudiantes.nomNivelEducacion = "3 Básica";
            this.datosCifrasEstudiantes.idInstitucion = data.idInstitucion;
            this.datosCifrasEstudiantes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasEstudiantes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasEstudiantes, path, uidN).then(() => {

            });
          }
        }
      }

      if (data.nivelEducacion[i] === 'basica4') {
        if (idInstitucion) {

          const basica4 = idInstitucion.find(filtroIdNiv => {
            return filtroIdNiv.id === 'basica4';
          });
          if (basica4) {
            //console.log('existe id niv basica 4', basica4);
          }
          else {
            const uidN = this.authService.GetId();
            this.datosCifrasEstudiantes.uid = uidN;
            this.datosCifrasEstudiantes.id = "basica4";
            this.datosCifrasEstudiantes.nomNivelEducacion = "4 Básica";
            this.datosCifrasEstudiantes.idInstitucion = data.idInstitucion;
            this.datosCifrasEstudiantes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasEstudiantes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasEstudiantes, path, uidN).then(() => {

            });
          }
        }
      }

      if (data.nivelEducacion[i] === 'basica5') {
        if (idInstitucion) {

          const basica5 = idInstitucion.find(filtroIdNiv => {
            return filtroIdNiv.id === 'basica5';
          });
          if (basica5) {
            //console.log('existe id niv basica 5', basica5);
          }
          else {
            const uidN = this.authService.GetId();
            this.datosCifrasEstudiantes.uid = uidN;
            this.datosCifrasEstudiantes.id = "basica5";
            this.datosCifrasEstudiantes.nomNivelEducacion = "5 Básica";
            this.datosCifrasEstudiantes.idInstitucion = data.idInstitucion;
            this.datosCifrasEstudiantes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasEstudiantes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasEstudiantes, path, uidN).then(() => {

            });
            const uidND = this.authService.GetId();//uid del documento de la colleccion cifrasDocentes
            this.datosCifrasDocentes.uid = uidND;
            this.datosCifrasDocentes.id = "media3";
            this.datosCifrasDocentes.nomNivelEducacion = "Media";
            this.datosCifrasDocentes.idInstitucion = data.idInstitucion;
            this.datosCifrasDocentes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasDocentes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasDocentes, 'CifrasDocentes', uidND).then(() => {

            });
          }
        }
      }

      if (data.nivelEducacion[i] === 'basica6') {
        if (idInstitucion) {
          const basica6 = idInstitucion.find(filtroIdNiv => {
            return filtroIdNiv.id === 'basica6';
          });
          if (basica6) {
            //console.log('existe id niv basica 6', basica6);
          }
          else {
            const uidN = this.authService.GetId();
            this.datosCifrasEstudiantes.uid = uidN;
            this.datosCifrasEstudiantes.id = "basica6";
            this.datosCifrasEstudiantes.nomNivelEducacion = "6 Básica";
            this.datosCifrasEstudiantes.idInstitucion = data.idInstitucion;
            this.datosCifrasEstudiantes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasEstudiantes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasEstudiantes, path, uidN).then(() => {

            });
          }
        }
      }

      if (data.nivelEducacion[i] === 'basica7') {
        if (idInstitucion) {
          const basica7 = idInstitucion.find(filtroIdNiv => {
            return filtroIdNiv.id === 'basica7';
          });
          if (basica7) {
            //console.log('existe id niv basica 7', basica7);
          }
          else {
            const uidN = this.authService.GetId();
            this.datosCifrasEstudiantes.uid = uidN;
            this.datosCifrasEstudiantes.id = "basica7";
            this.datosCifrasEstudiantes.nomNivelEducacion = "7 Básica";
            this.datosCifrasEstudiantes.idInstitucion = data.idInstitucion;
            this.datosCifrasEstudiantes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasEstudiantes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasEstudiantes, path, uidN).then(() => {

            });
          }
        }
      }

      if (data.nivelEducacion[i] === 'basica8') {
        if (idInstitucion) {
          const basica8 = idInstitucion.find(filtroIdNiv => {
            return filtroIdNiv.id === 'basica8';
          });
          if (basica8) {
            //console.log('existe id niv basica 8', basica8);
          }
          else {
            const uidN = this.authService.GetId();
            this.datosCifrasEstudiantes.uid = uidN;
            this.datosCifrasEstudiantes.id = "basica8";
            this.datosCifrasEstudiantes.nomNivelEducacion = "8 Básica";
            this.datosCifrasEstudiantes.idInstitucion = data.idInstitucion;
            this.datosCifrasEstudiantes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasEstudiantes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasEstudiantes, path, uidN).then(() => {

            });
            const uidND = this.authService.GetId();//uid del documento de la colleccion cifrasDocentes
            this.datosCifrasDocentes.uid = uidND;
            this.datosCifrasDocentes.id = "basicaSup4";
            this.datosCifrasDocentes.nomNivelEducacion = "Básica Superior";
            this.datosCifrasDocentes.idInstitucion = data.idInstitucion;
            this.datosCifrasDocentes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasDocentes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasDocentes, 'CifrasDocentes', uidND).then(() => {

            });
          }
        }
      }

      if (data.nivelEducacion[i] === 'basica9') {
        if (idInstitucion) {
          const basica9 = idInstitucion.find(filtroIdNiv => {
            return filtroIdNiv.id === 'basica9';
          });
          if (basica9) {
            //console.log('existe id niv basica 9', basica9);
          }
          else {
            const uidN = this.authService.GetId();
            this.datosCifrasEstudiantes.uid = uidN;
            this.datosCifrasEstudiantes.id = "basica9";
            this.datosCifrasEstudiantes.nomNivelEducacion = "9 Básica";
            this.datosCifrasEstudiantes.idInstitucion = data.idInstitucion;
            this.datosCifrasEstudiantes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasEstudiantes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasEstudiantes, path, uidN).then(() => {
            });
          }
        }
      }

      if (data.nivelEducacion[i] === 'basica10') {
        if (idInstitucion) {
          const basica10 = idInstitucion.find(filtroIdNiv => {
            return filtroIdNiv.id === 'basica10';
          });
          if (basica10) {
            //console.log('existe id niv basica 10', basica10);
          }
          else {
            const uidN = this.authService.GetId();
            this.datosCifrasEstudiantes.uid = uidN;
            this.datosCifrasEstudiantes.id = "basica10";
            this.datosCifrasEstudiantes.nomNivelEducacion = "10 Básica";
            this.datosCifrasEstudiantes.idInstitucion = data.idInstitucion;
            this.datosCifrasEstudiantes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasEstudiantes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasEstudiantes, path, uidN).then(() => {
            });
          }
        }
      }

      if (data.nivelEducacion[i] === 'bachi1') {
        if (idInstitucion) {
          const bachi1 = idInstitucion.find(filtroIdNiv => {
            return filtroIdNiv.id === 'bachi1';
          });
          if (bachi1) {
            //console.log('existe id niv bachi 1 ', bachi1);
          }
          else {
            const uidN = this.authService.GetId();
            this.datosCifrasEstudiantes.uid = uidN;
            this.datosCifrasEstudiantes.id = "bachi1";
            this.datosCifrasEstudiantes.nomNivelEducacion = "1 Bachillerato";
            this.datosCifrasEstudiantes.idInstitucion = data.idInstitucion;
            this.datosCifrasEstudiantes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasEstudiantes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasEstudiantes, path, uidN).then(() => {
            });
            const uidND = this.authService.GetId();//uid del documento de la colleccion cifrasDocentes
            this.datosCifrasDocentes.uid = uidND;
            this.datosCifrasDocentes.id = "bachillerato5";
            this.datosCifrasDocentes.nomNivelEducacion = "Bachillerato";
            this.datosCifrasDocentes.idInstitucion = data.idInstitucion;
            this.datosCifrasDocentes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasDocentes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasDocentes, 'CifrasDocentes', uidND).then(() => {
            });
          }
        }
      }

      if (data.nivelEducacion[i] === 'bachi2') {
        if (idInstitucion) {

          const bachi2 = idInstitucion.find(filtroIdNiv => {
            return filtroIdNiv.id === 'bachi2';
          });
          if (bachi2) {
            // console.log('existe id niv bachi 2 ', bachi2);
          }
          else {
            const uidN = this.authService.GetId();
            this.datosCifrasEstudiantes.uid = uidN;
            this.datosCifrasEstudiantes.id = "bachi2";
            this.datosCifrasEstudiantes.nomNivelEducacion = "2 Bachillerato";
            this.datosCifrasEstudiantes.idInstitucion = data.idInstitucion;
            this.datosCifrasEstudiantes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasEstudiantes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasEstudiantes, path, uidN).then(() => {
            });
          }
        }
      }

      if (data.nivelEducacion[i] === 'bachi3') {
        if (idInstitucion) {
          const bachi3 = idInstitucion.find(filtroIdNiv => {
            return filtroIdNiv.id === 'bachi3';
          });
          if (bachi3) {
            // console.log('existe id niv bachi 3 ', bachi3);
          }
          else {
            const uidN = this.authService.GetId();
            this.datosCifrasEstudiantes.uid = uidN;
            this.datosCifrasEstudiantes.id = "bachi3";
            this.datosCifrasEstudiantes.nomNivelEducacion = "3 Bachillerato";
            this.datosCifrasEstudiantes.idInstitucion = data.idInstitucion;
            this.datosCifrasEstudiantes.nomInstitucion = data.nomInstitucion;
            this.datosCifrasEstudiantes.nomProvincia = data.nomProvincia;
            this.authService.CrearDoc(this.datosCifrasEstudiantes, path, uidN).then(() => {
            });
          }
        }
      }
    }
    const pathImage = 'Instituciones';
    const name = this.infoInstitucion.codigoAMIE;
    const res = await this.instiService.SubirImagen(this.file, pathImage, name);
    data.logo = res;

    //recorre como un array la coleccion y busca el nombre de la institucion para actualizar la data de esa coleccion
    const instiFiltered = this.instiService.arrayInstitucion
      .find(instiFilteredbynombre => instiFilteredbynombre.codigoAMIE === data.codigoAMIE);
    if (instiFiltered.codigoAMIE) {
      this.instiService.UpdateInstitucion(data);
      this.toastr.success('Registro actualizado exitosamente', '');
    } else {
      this.toastr.warning('Datos inválidos, Intente de nuevo', '');
    }
  }
  async SubirArchivo(event: any) {
    if (event.target.files[0]) {
      const file: File = event.target.files[0];
      const pattern = /image-*/;
      if (!file.type.match(pattern)) {
        this.toastr.error('Formato incorrecto', '');
        return;
      }
      const reader = new FileReader(); // leer el contenido del archivo
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.photoUrl = reader.result;
      };
    }
  }

  getDoc<Usuarios>(path: string, id: any) {
    return this.afs.collection(path).doc<Usuarios>(id).valueChanges()
  }
}
