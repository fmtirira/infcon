import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { parse } from 'path';
import { Observable } from 'rxjs';
import { InstitucionesI, Nivel } from 'src/app/models/institucion.interface';
import { InstitucionesService } from 'src/app/services/instituciones.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  totalInstituciones: any;
  dataNivel: Nivel[] | undefined;
  dataNivelSierra: Nivel[] | undefined;
  dataNivelCosta: Nivel[] | undefined;
  dataNivelAmazonia: Nivel[] | undefined;
  dataNivelInsular: Nivel[] | undefined;
  sumaTotal!: number;
  sumaMujeres!: number;
  sumaHombres!: number;
  total!: number;


  public InstitucionCollection!: AngularFirestoreCollection<InstitucionesI>;
  public InstitucionDocument!: AngularFirestoreDocument<InstitucionesI>;
  public InstitucionInfo!: Observable<any[]>;
  public myNivelOf$!: Observable<any>;
  public institucionElements!: InstitucionesI[];
  public nivel!: Nivel[];
  Sierra!: ['AZUAY', 'BOLÍVAR', 'CAÑAR', 'CARCHI', 'CHIMBOZARO', 'COTOPAXI', 'IMBABURA', 'LOJA', 'PICHINCHA', 'TUNGURAHUA'];
  cifraTotal: [] = [];
  totalEstudiantes = 0;
  totalEstudiantesSierra = 0;
  totalEstudiantesCosta = 0;
  totalEstudiantesAmazonia = 0;
  totalEstudiantesInsular = 0;
  totalEstudiantesMujeres = 0;
  totalEstudiantesHombres = 0;
  selectProvincia!: any;
  filtro!: any;
  constructor(
    private afs: AngularFirestore,
    private institucionService: InstitucionesService
  ) { }

  ngOnInit(): void {

    this.institucionService.GetAllInstituciones()
      .subscribe(institucion => {
        this.institucionElements = institucion;
        institucion.forEach(prov => {
          this.selectProvincia = prov.nomProvincia;
          console.log('--->', this.selectProvincia);

          if (prov.nomProvincia === 'AZUAY' || prov.nomProvincia === 'BOLÍVAR' || prov.nomProvincia === 'CAÑAR' || prov.nomProvincia === 'CARCHI'
            || prov.nomProvincia === 'CHIMBOZARO' || prov.nomProvincia === 'COTOPAXI' || prov.nomProvincia === 'IMBABURA' || prov.nomProvincia === 'LOJA'
            || prov.nomProvincia === 'PICHINCHA' || prov.nomProvincia === 'TUNGURAHUA') {
            if (prov.nomProvincia) {
              this.dataNivelSierra = prov.niveles;
              this.dataNivelSierra?.forEach(sierraCifras => {
                this.totalEstudiantesSierra = this.totalEstudiantesSierra + sierraCifras.total;
              });
              console.log('ES SIERRA', prov);
            }
          }

          if (prov.nomProvincia === 'EL ORO' || prov.nomProvincia === 'ESMERALDAS' || prov.nomProvincia === 'GUAYAS' || prov.nomProvincia === 'LOS RÍOS'
            || prov.nomProvincia === 'MANABÍ' || prov.nomProvincia === 'SANTA ELENA' || prov.nomProvincia === 'SANTO DOMINGO DE LOS TSÁCHILAS') {
            if (prov.nomProvincia) {
              this.dataNivelCosta = prov.niveles;
              this.dataNivelCosta?.forEach(costaCifras => {
                this.totalEstudiantesCosta = this.totalEstudiantesCosta + costaCifras.total;
              });
              console.log('ES COSTA', prov);
            }
          }
               
          if (prov.nomProvincia === 'SUCUMBÍOS' || prov.nomProvincia === 'MORONA SANTIAGO' || prov.nomProvincia === 'NAPO' 
          || prov.nomProvincia === 'ORELLANA' || prov.nomProvincia === 'PASTAZA' || prov.nomProvincia === 'ZAMORA CHINCHIPE') {
          if (prov.nomProvincia) {
            this.dataNivelAmazonia = prov.niveles;
            this.dataNivelAmazonia?.forEach(amazoniaCifras => {
              this.totalEstudiantesAmazonia= this.totalEstudiantesAmazonia + amazoniaCifras.total;
            });
            console.log('ES AMAZONIA', prov);
          }          
        }
        
        if (prov.nomProvincia === 'GALÁPAGOS') {
          if (prov.nomProvincia) {
            this.dataNivelInsular = prov.niveles;
            this.dataNivelInsular?.forEach(insularCifras => {
              this.totalEstudiantesInsular= this.totalEstudiantesInsular + insularCifras.total;
            });
            console.log('ES AMAZONIA', prov);
          }          
        }
        });
        console.log('->num ', this.institucionElements.length);
        this.institucionElements.forEach(res => {
          this.dataNivel = res.niveles; //guardo en dataNivel el array de objetos de niveles que tiene cada institucion
          this.dataNivel?.forEach(c => { //recorro el array dataNivel
            this.totalEstudiantes = this.totalEstudiantes + c.total; //acumulo el total en una variable global e imprimo en la vista el totalEstudiantes (variable)
            this.totalEstudiantesHombres = this.totalEstudiantesHombres + c.hombres;
            this.totalEstudiantesMujeres = this.totalEstudiantesMujeres + c.mujeres;
            console.log('c ->', c.total);
            console.log('suma tot', this.totalEstudiantes);
          });
        });
        this.totalInstituciones = institucion.length;


      });

  }

}
