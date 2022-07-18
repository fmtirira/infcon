import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesI, Nivel } from 'src/app/models/institucion.interface';
import { Provincias } from 'src/app/models/provincia.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DialogosService } from 'src/app/services/dialogos.service';
import { InstitucionesService } from 'src/app/services/instituciones.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

import { of } from "rxjs";
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-visualizarcifra-estudiantes',
  templateUrl: './visualizarcifra-estudiantes.component.html',
  styleUrls: ['./visualizarcifra-estudiantes.component.css'],
  providers: [ProvinciaService]
})
export class VisualizarcifraEstudiantesComponent implements OnInit {

  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = [];
  displayedColumns: string[] = ['numero', 'nomInstitucion'];
  displayedColumnsNiveles: string[] = ['numero','nomInstitucion','nomNivelEducacion', 'hombres', 'mujeres', 'total'];
  dataNivel!: Nivel[] | undefined;
  lista: unknown[] = [];
  infoNi!: any;
  dataSource = new MatTableDataSource();
  dataSourceNiveles= new MatTableDataSource();
  instituciones: InstitucionesI[] = []; //el array donde se almacena lo que se lee en firestore
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService,
    private afs: AngularFirestore,
    public provinciaSvc: ProvinciaService,
    public institucionService: InstitucionesService,
    public dialogoService: DialogosService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    let i = 0;
    this.provincias = this.provinciaSvc.GetProvincias();
    this.institucionService.GetAllInstituciones()
      .subscribe(institucion => {
       // this.dataSource.data = institucion;
        const dataInsti$ = of(institucion);

        dataInsti$.subscribe(c => {

          console.log('c ', c);

          //me imprime la info de cada institucion
          c.forEach(niv => {
            console.log('lengt', c.length);

            this.lista[i] = niv.idInstitucion;

            this.getDoc<InstitucionesI>('Instituciones', this.lista[i]).subscribe(resNiv =>{
              
              if(resNiv){
                //this.dataSource.data[i] = resNiv;
                this.infoNi = resNiv.niveles || resNiv.idInstitucion || resNiv.nomInstitucion;
                this.dataNivel = this.infoNi;
                this.dataSourceNiveles = this.infoNi;
               
                console.log('InfoNiv',this.infoNi);
              }
              
            });     
            this.dataSourceNiveles.paginator = this.paginator;
            const dataInstitucion$ = of(niv.niveles);
            dataInstitucion$.subscribe(nivel => {
              console.log('nivel', nivel);
              this.dataNivel = nivel;

            });
            console.log('this.dataNivel', this.dataNivel);
            
          });         

          /*  this.dataNivel = c.niveles;
          
           console.log('this.dataNiveles', this.dataNivel);
           this.dataSourceNiveles.data[i] = this.dataNivel;
           c.niveles?.forEach(s => {
             s.nomNivelEducacion;
 
             this.dataSourceNiveles.data[i] = c.niveles;
             console.log('c->', this.dataSourceNiveles.data[i]);
           });
           i++;
           this.dataSourceNiveles.paginator = this.paginator; */
        });
        i++;
        console.log('niv lista id ', this.lista);
        
      });
      
    //this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceNiveles.filter = filterValue.trim().toLowerCase();
  }

  getDoc<Usuarios>(path: string, id: any) {
    return this.afs.collection(path).doc<Usuarios>(id).valueChanges()
  }

}
