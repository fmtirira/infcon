import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesI, Nivel } from 'src/app/models/institucion.interface';
import { Provincias } from 'src/app/models/provincia.interface';
import { AuthService } from 'src/app/services/auth.service';
import { InstitucionesService } from 'src/app/services/instituciones.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CifrasEstudiantesService } from 'src/app/services/cifras-estudiantes.service';
import { CifrasEstudiantesI } from 'src/app/models/cifrasEstudiantes.interface';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/user';

@Component({
  selector: 'app-visualizarcifra-estudiantes',
  templateUrl: './visualizarcifra-estudiantes.component.html',
  styleUrls: ['./visualizarcifra-estudiantes.component.css'],
  providers: [ProvinciaService]
})
export class VisualizarcifraEstudiantesComponent implements OnInit {
  activar = false;
  totalEstudiantes = 0;
  totalEstudiantesHombres = 0;
  totalEstudiantesMujeres = 0;
  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = [];
  displayedColumns: string[] = ['numero', 'nomInstitucion', 'nomNivelEducacion', 'hombres', 'mujeres', 'total'];
  estudiantes: CifrasEstudiantesI[] = [];
  estudiantesC: CifrasEstudiantesI [] = [];
  dataSource = new MatTableDataSource();
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService,
    private router: Router,
    private afs: AngularFirestore,
    public provinciaSvc: ProvinciaService,
    public institucionService: InstitucionesService,
    public cifrasEService: CifrasEstudiantesService,
    public toastr: ToastrService,
  ) {
    this.authService.StateUser().subscribe(idA => {
      if (idA) {
        this.authService.GetDoc<Usuarios>('Usuarios', idA.uid).subscribe(rolesV => {
          if (rolesV) {
            if (rolesV.roles === 'directivo') {
              this.activar = true;
            }
            else {
              this.activar = false;
              this.router.navigate(['/inicio']);
            }
          }
        })
      }
    });
  }

  ngOnInit(): void {

    this.provincias = this.provinciaSvc.GetProvincias();

    this.cifrasEService.GetAllCifrasEstudiantes()
      .subscribe(cifrasEstudiantes => {
        this.estudiantes = cifrasEstudiantes;
        this.dataSource.data = this.estudiantes;
        this.totalEstudiantes = 0;
        this.estudiantes?.forEach(c => { //recorro el array cifraTotal
          this.totalEstudiantes = this.totalEstudiantes + c.total; //acumulo el total en una variable global e imprimo en la vista el totalEstudiantes (variable)
          this.totalEstudiantesHombres = this.totalEstudiantesHombres + c.hombres;
          this.totalEstudiantesMujeres = this.totalEstudiantesMujeres + c.mujeres;

        });
      })
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
}

