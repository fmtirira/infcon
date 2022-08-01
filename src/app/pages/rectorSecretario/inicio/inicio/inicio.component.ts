import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EmailAuthProvider } from '@firebase/auth';
import { Observable } from 'rxjs';
import { CifrasEstudiantesI } from 'src/app/models/cifrasEstudiantes.interface';
import { InstitucionesI, Nivel } from 'src/app/models/institucion.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CifrasEstudiantesService } from 'src/app/services/cifras-estudiantes.service';
import { InstitucionesService } from 'src/app/services/instituciones.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  idUsu!: any;
  rolUsu!: any;
  totalInstituciones: any;
  dataCifrasSierra: CifrasEstudiantesI | undefined;
  dataCifrasCosta: CifrasEstudiantesI | undefined;
  dataCifrasInsular: CifrasEstudiantesI | undefined;
  dataCifrasAmazonia: CifrasEstudiantesI | undefined;

  institucionesSierra = 0;
  institucionesCosta = 0;
  institucionesInsular = 0;
  institucionesAmazonia = 0;

  sumaTotal!: number;
  sumaMujeres!: number;
  sumaHombres!: number;
  total!: number;
  datosDivEstudiantes = false;
  datosDivInstituciones = false;
  tabsDirectivo = false;
  tabsRector = false;
  tabsPresidente = false;
  tabsAdmin = false;
  public institucionElements!: InstitucionesI[];
  public institucionSierra!: InstitucionesI[];
  public institucionCosta!: InstitucionesI[];
  public institucionAmazonia!: InstitucionesI[];
  public institucionInsular!: InstitucionesI[];
  private institucionRegiones: any = '';

  cifraTotal: CifrasEstudiantesI[] = [];
  totalEstudiantes = 0;
  totalEstudiantesSierra = 0;
  totalEstudiantesCosta = 0;
  totalEstudiantesAmazonia = 0;
  totalEstudiantesInsular = 0;
  totalEstudiantesMujeres = 0;
  totalEstudiantesHombres = 0;
  selectProvincia!: any;

  constructor(
    private afs: AngularFirestore,
    private institucionService: InstitucionesService,
    private cifrasEService: CifrasEstudiantesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getInfoUser();
    this.cifrasEService.GetAllCifrasEstudiantes()
      .subscribe(cifrasE => {
        this.totalEstudiantes = 0; 
        this.totalEstudiantesHombres = 0;
        this.totalEstudiantesMujeres =0;
        cifrasE.forEach(cifrasProv => {
          this.selectProvincia = cifrasProv.nomProvincia;
          if (cifrasProv.nomProvincia === 'AZUAY' || cifrasProv.nomProvincia === 'BOLÍVAR' || cifrasProv.nomProvincia === 'CAÑAR' || cifrasProv.nomProvincia === 'CARCHI'
            || cifrasProv.nomProvincia === 'CHIMBOZARO' || cifrasProv.nomProvincia === 'COTOPAXI' || cifrasProv.nomProvincia === 'IMBABURA' || cifrasProv.nomProvincia === 'LOJA'
            || cifrasProv.nomProvincia === 'PICHINCHA' || cifrasProv.nomProvincia === 'TUNGURAHUA') {
            if (cifrasProv.nomProvincia) {
              this.dataCifrasSierra = cifrasProv;
              this.totalEstudiantesSierra = this.totalEstudiantesSierra + this.dataCifrasSierra.total;
            }
          }
          if (cifrasProv.nomProvincia === 'EL ORO' || cifrasProv.nomProvincia === 'ESMERALDAS' || cifrasProv.nomProvincia === 'GUAYAS' || cifrasProv.nomProvincia === 'LOS RÍOS'
            || cifrasProv.nomProvincia === 'MANABÍ' || cifrasProv.nomProvincia === 'SANTA ELENA' || cifrasProv.nomProvincia === 'SANTO DOMINGO DE LOS TSÁCHILAS') {
            if (cifrasProv.nomProvincia) {
              this.dataCifrasCosta = cifrasProv;
              this.totalEstudiantesCosta = this.totalEstudiantesCosta + this.dataCifrasCosta.total;
            }
          }
          if (cifrasProv.nomProvincia === 'SUCUMBÍOS' || cifrasProv.nomProvincia === 'MORONA SANTIAGO' || cifrasProv.nomProvincia === 'NAPO'
            || cifrasProv.nomProvincia === 'ORELLANA' || cifrasProv.nomProvincia === 'PASTAZA' || cifrasProv.nomProvincia === 'ZAMORA CHINCHIPE') {
            if (cifrasProv.nomProvincia) {
              this.dataCifrasAmazonia = cifrasProv;

              this.totalEstudiantesAmazonia = this.totalEstudiantesAmazonia + this.dataCifrasAmazonia.total;

            }
          }
          if (cifrasProv.nomProvincia === 'GALÁPAGOS') {
            if (cifrasProv.nomProvincia) {
              this.dataCifrasInsular = cifrasProv;
              this.totalEstudiantesInsular = this.totalEstudiantesInsular + this.dataCifrasInsular.total;
            }
          }
        });

        this.cifraTotal = cifrasE;

        this.cifraTotal?.forEach(c => { //recorro el array cifraTotal
          this.totalEstudiantes = this.totalEstudiantes + c.total; //acumulo el total en una variable global e imprimo en la vista el totalEstudiantes (variable)
          this.totalEstudiantesHombres = this.totalEstudiantesHombres + c.hombres;
          this.totalEstudiantesMujeres = this.totalEstudiantesMujeres + c.mujeres;

        });

      });
    this.institucionService.GetAllInstituciones()
      .subscribe(institucion => {
        this.institucionesInsular = 0;
        this.institucionesAmazonia = 0;
        this.institucionesSierra = 0;
        this.institucionesCosta = 0;
        this.institucionElements = institucion;
        this.institucionElements.forEach(institucionProv => {
          if (institucionProv.nomProvincia === 'AZUAY' || institucionProv.nomProvincia === 'BOLÍVAR' || institucionProv.nomProvincia === 'CAÑAR'
            || institucionProv.nomProvincia === 'CARCHI' || institucionProv.nomProvincia === 'CHIMBOZARO' || institucionProv.nomProvincia === 'COTOPAXI'
            || institucionProv.nomProvincia === 'IMBABURA' || institucionProv.nomProvincia === 'LOJA' || institucionProv.nomProvincia === 'PICHINCHA'
            || institucionProv.nomProvincia === 'TUNGURAHUA') {
            this.institucionesSierra++;
          }
          if (institucionProv.nomProvincia === 'EL ORO' || institucionProv.nomProvincia === 'ESMERALDAS' || institucionProv.nomProvincia === 'GUAYAS'
            || institucionProv.nomProvincia === 'LOS RÍOS' || institucionProv.nomProvincia === 'MANABÍ' || institucionProv.nomProvincia === 'SANTA ELENA'
            || institucionProv.nomProvincia === 'SANTO DOMINGO DE LOS TSÁCHILAS') {
            this.institucionesCosta++;
          }
          if (institucionProv.nomProvincia === 'SUCUMBÍOS' || institucionProv.nomProvincia === 'MORONA SANTIAGO' || institucionProv.nomProvincia === 'NAPO'
            || institucionProv.nomProvincia === 'ORELLANA' || institucionProv.nomProvincia === 'PASTAZA' || institucionProv.nomProvincia === 'ZAMORA CHINCHIPE'
          ) {
            this.institucionesAmazonia++;
          }
          if (institucionProv.nomProvincia === 'GALÁPAGOS') {
            this.institucionesInsular++;
          }
        })

        this.totalInstituciones = institucion.length;
      });

  }

  MostrarEstudiantes() {
    return (this.datosDivEstudiantes = true) && (this.datosDivInstituciones = false);
  }
  MostrarInstituciones() {
    return (this.datosDivInstituciones = true) && (this.datosDivEstudiantes = false);
  }

  getInfoUser() {
    
    this.authService.StateUser().subscribe(res => {
      this.idUsu = res?.uid;
      const path = 'Usuarios';
      
      this.getDoc<Usuarios>(path, this.idUsu).subscribe(resUsuario => {
        this.rolUsu = resUsuario?.roles;
        if (this.rolUsu === 'directivo') {
          this.tabsDirectivo = true;
        }
        if (this.rolUsu === 'secretarioRector') {
          this.tabsRector = true;
        }
        if (this.rolUsu === 'presidente') {
          this.tabsPresidente = true;
        }
        if(this.rolUsu ==='admin'){
          this.tabsAdmin = true;
        }
      });
    });

  }

  getDoc<Usuarios>(path: string, id: any) {
    return this.afs.collection(path).doc<Usuarios>(id).valueChanges()
  }

}
