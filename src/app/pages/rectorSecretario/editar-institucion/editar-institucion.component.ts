import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { InmuebleEdificioI, JornadaI, JurisdiccionI, ModalidadI, NivelGroupI, SostenimientoI, TipoEducacionI, ZonaInecI } from 'src/app/models/nivelEducacion.interface';
import { Provincias } from 'src/app/models/provincia.interface';
import { Usuarios } from 'src/app/models/user';
import { DialognivelComponent } from 'src/app/pages/rectorSecretario/dialognivel/dialognivel.component';
import { AuthService } from 'src/app/services/auth.service';
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
  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = [];
  public nivelesEducacion: NivelGroupI[] = [];
  public niveDocentes!: NivelGroupI;
  public tipoEducacion: TipoEducacionI[] = [];
  public sostenimientos: SostenimientoI[] = [];
  public zonasInec: ZonaInecI[] = [];
  public jurisdicciones: JurisdiccionI[] = [];
  public inmuebleEdi: InmuebleEdificioI[] = [];
  public jornadas: JornadaI[] = [];
  public modalidades: ModalidadI[] = [];

  datosInstitucion: InstitucionesI = {
    idInstitucion: '',
    codigoAMIE: '',
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
    cifrasAdministrativos: [{
      idAdmin: 'cifraAdmin',
      adminHombres: '',
      adminMujeres: '',
    }],
  }

  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  editarInstitucionForm = new FormGroup({
    idInstitucion: new FormControl(null),
    codigoAMIE: new FormControl('', Validators.required),
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
    private toastr: ToastrService,
    public nivelesSvc: NivelesService,
    public provinciaSvc: ProvinciaService,
    public authService: AuthService,
    public usuRectorSecreSvc: UsurectorsecreService,
    public afs: AngularFirestore
  ) {

  }

  ngOnInit() {

    console.log('estoy en institucion');
    this.modalidades = this.nivelesSvc.GetModalidad();
    this.jornadas = this.nivelesSvc.GetJornada();
    this.inmuebleEdi = this.nivelesSvc.GetInmuebleEdi();
    this.zonasInec = this.nivelesSvc.GetZonaInec();
    this.tipoEducacion = this.nivelesSvc.GetTiposEducacion();
    this.sostenimientos = this.nivelesSvc.GetSostenimiento();
    this.jurisdicciones = this.nivelesSvc.GetJurisdiccion();
    this.nivelesEducacion = this.nivelesSvc.GetNiveles();
    this.provincias = this.provinciaSvc.GetProvincias();
    this.authService.StateUser().subscribe(res => {
      this.getUid();
    });
  }

  async getUid() {
    const uid = await this.authService.GetUid();
    if (uid) {
      this.uid = uid;
      console.log('uid ->', this.uid);
      this.getInfoUser();
    } else {
      console.log('no existe uid');
    }
  }
  //traer un solo usuario
  GetInstitucionById(idInstitucion: any) {
    return this.afs.collection('Instituciones')
      .doc(idInstitucion)
      .valueChanges()
  }

  getInfoUser() {
    const path = 'Usuarios';
    const id = this.uid;
    this.getDoc<Usuarios>(path, id).subscribe(res => {
      console.log('datos son ->', res);
      if (res) {
        this.info = res;
        //this.infoInstitucion = res;
        //console.log('info institucion', this.infoInstitucion.idInstitucion);
        //this.info.nomInstitucion= this.datosInstitucion.nomInstitucion;
        // this.info.idInstitucion = this.datosInstitucion.idInstitucion;
        const pathI = 'Instituciones';
        this.getDoc<InstitucionesI>(pathI, this.info.idInstitucion).subscribe(resInsti => {
          if (resInsti) {
            this.infoInstitucion = resInsti;
            this.editarInstitucionForm.get('idInstitucion')?.setValue(this.infoInstitucion.idInstitucion);
            this.editarInstitucionForm.get('codigoAMIE')?.setValue(this.infoInstitucion.codigoAMIE);
            this.editarInstitucionForm.get('nomInstitucion')?.setValue(this.infoInstitucion.nomInstitucion);
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
    const lista = [];
    const docentes = [];
    this.nivelesSelected = val;
    console.log("selecciona los niveles", val);
    console.log("this.nivelesSelected ", this.nivelesSelected);
    for (const value of this.nivelesSelected) {
      if (value === "anios3") {
        const tresAnios = {
          id: "anios3",
          nomNivelEducacion: "3 Años",
          hombres: '',
          mujeres: '',
          total: '',
        };
        lista.push(tresAnios);
      }
      if (value === "anios4") {
        const cuatroAnios = {
          id: "anios4",
          nomNivelEducacion: "4 Años",
          hombres: '',
          mujeres: '',
          total: '',
        };
        lista.push(cuatroAnios);
      }
      if (value === "basica1") {
        const primeroB = {
          id: "basica1",
          nomNivelEducacion: "1 Básica",
          hombres: '',
          mujeres: '',
          total: '',
        };
        lista.push(primeroB);
      }

      if (value === "basica2") {
        const segundoB = {
          id: "basica2",
          nomNivelEducacion: "2 Básica",
          hombres: '',
          mujeres: '',
          total: '',
        };
        lista.push(segundoB);
      }
      if (value === "basica3") {
        const terceroB = {
          id: "basica3",
          nomNivelEducacion: "3 Básica",
          hombres: '',
          mujeres: '',
          total: '',
        };
        lista.push(terceroB);
      }
      if (value === "basica4") {
        const cuartoB = {
          id: "basica4",
          nomNivelEducacion: "4 Básica",
          hombres: '',
          mujeres: '',
          total: '',
        };
        lista.push(cuartoB);
      }

      if (value === "basica5") {
        const quintoB = {
          id: "basica5",
          nomNivelEducacion: "5 Básica",
          hombres: '',
          mujeres: '',
          total: '',
        };
        lista.push(quintoB);
      }
      if (value === "basica6") {
        const sextoB = {
          id: "basica6",
          nomNivelEducacion: "6 Básica",
          hombres: '',
          mujeres: '',
          total: '',
        };
        lista.push(sextoB);
      }
      if (value === "basica7") {
        const septimoB = {
          id: "basica7",
          nomNivelEducacion: "7 Básica",
          hombres: '',
          mujeres: '',
          total: '',
        };
        lista.push(septimoB);
      }

      if (value === "basica8") {
        const octavoB = {
          id: "basica8",
          nomNivelEducacion: "8 Básica",
          hombres: '',
          mujeres: '',
          total: '',
        };
        lista.push(octavoB);
      }
      if (value === "basica9") {
        const novenoB = {
          id: "basica9",
          nomNivelEducacion: "9 Básica",
          hombres: '',
          mujeres: '',
          total: '',
        };
        lista.push(novenoB);
      }
      if (value === "basica10") {
        const decimoB = {
          id: "basica10",
          nomNivelEducacion: "10 Básica",
          hombres: '',
          mujeres: '',
          total: '',
        };
        lista.push(decimoB);
      }

      if (value === "bachi1") {
        const primeroBachi = {
          id: "bachi1",
          nomNivelEducacion: "1 Bachillerato",
          hombres: '',
          mujeres: '',
          total: '',
        };
        lista.push(primeroBachi);
      }
      if (value === "bachi2") {
        const segundoBachi = {
          id: "bachi2",
          nomNivelEducacion: "2 Bachillerato",
          hombres: '',
          mujeres: '',
          total: '',
        };
        lista.push(segundoBachi);
      }
      if (value === "bachi3") {
        const terceroBachi = {
          id: "bachi3",
          nomNivelEducacion: "3 Bachillerato",
          hombres: '',
          mujeres: '',
          total: '',
        };
        lista.push(terceroBachi);
      }
    }
    this.infoInstitucion.niveles = lista;

    const inicialI = this.nivelesSelected.includes('basica1');
    const preparatoriaI = this.nivelesSelected.includes('basica2');
    const mediaI = this.nivelesSelected.includes('basica5');
    const basicaSupI = this.nivelesSelected.includes('basica8');
    const bachilleratoI = this.nivelesSelected.includes('bachi1');

    if (inicialI === true) {
      const inicial = {
        idNivel: "inicial1",
        nomNivelEducacion: "Inicial",
        docenHombres: '',
        docenMujeres: '',
        docenTotal: '',
      };
      docentes.push(inicial);
    }
    if (preparatoriaI === true) {
      const preparatoria = {
        idNivel: "preparatoria2",
        nomNivelEducacion: "Preparatoria",
        docenHombres: '',
        docenMujeres: '',
        docenTotal: '',
      };
      docentes.push(preparatoria);
    }
    if (mediaI === true) {
      const media = {
        idNivel: "media3",
        nomNivelEducacion: "Media",
        docenHombres: '',
        docenMujeres: '',
        docenTotal: '',
      };
      docentes.push(media);
    }
    if (basicaSupI === true) {
      const basicaSup = {
        idNivel: "basicaSup4",
        nomNivelEducacion: "Básica Superior",
        docenHombres: '',
        docenMujeres: '',
        docenTotal: '',
      };
      docentes.push(basicaSup);
    }
    if (bachilleratoI === true) {
      const bachillerato = {
        idNivel: "bachillerato5",
        nomNivelEducacion: "Bachillerato",
        docenHombres: '',
        docenMujeres: '',
        docenTotal: '',
      };
      docentes.push(bachillerato);
    }


    this.infoInstitucion.cifrasDocentes = docentes;
  }

  OnSaveInsti(data: InstitucionesI) {

    data.nomInstitucion = data.nomInstitucion?.toLowerCase();
    data.niveles = this.infoInstitucion.niveles; // esta agregando lo que se hizo en los if       
    //const inicialI = this.nivelesSelected.includes('basica1');
    data.cifrasDocentes = this.infoInstitucion.cifrasDocentes;
    //recorre como un array la coleccion y busca el nombre de la institucion para actualizar la data de esa coleccion
    const instiFiltered = this.instiService.arrayInstitucion
      .find(instiFilteredbynombre => instiFilteredbynombre.nomInstitucion === data.nomInstitucion);
    if (((this.instiService.instiSelected.nomInstitucion === data.nomInstitucion) && instiFiltered) || instiFiltered === undefined) {
      this.instiService.UpdateInstitucion(data);
      this.toastr.success('Registro actualizado exitosamente', '');
      console.log("datos de la institucion", data);
    } else {
      this.toastr.warning('Datos inválidos, Intente de nuevo', '');
    }

  }
  getDoc<Usuarios>(path: string, id: any) {
    return this.afs.collection(path).doc<Usuarios>(id).valueChanges()
  }
}
