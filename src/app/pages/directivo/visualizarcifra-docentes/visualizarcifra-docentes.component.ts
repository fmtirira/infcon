import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CifrasDocentesI } from 'src/app/models/cifrasDocentes.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CifrasDocentesService } from 'src/app/services/cifras-docentes.service';
import { InstitucionesService } from 'src/app/services/instituciones.service';

@Component({
  selector: 'app-visualizarcifra-docentes',
  templateUrl: './visualizarcifra-docentes.component.html',
  styleUrls: ['./visualizarcifra-docentes.component.css']
})
export class VisualizarcifraDocentesComponent implements OnInit {
  activar = false;
  displayedColumns: string[] = ['numero', 'nomInstitucion', 'nomNivelEducacion', 'hombres', 'mujeres', 'total'];
  docentes: CifrasDocentesI[] = [];
  dataSource = new MatTableDataSource();
  totalDocentes = 0;
  totalDocentesHombres = 0;
  totalDocentesMujeres = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    public institucionService: InstitucionesService,
    public cifrasDService: CifrasDocentesService,
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
    this.cifrasDService.GetAllCifrasDocentes()
      .subscribe(cifrasDocentes => {
        this.docentes = cifrasDocentes;
        this.dataSource.data = this.docentes;
        this.totalDocentes = 0;
        this.totalDocentesHombres = 0;
        this.totalDocentesMujeres = 0;
        this.docentes?.forEach(c => { //recorro el array cifraTotal
          this.totalDocentes = this.totalDocentes + c.total; //acumulo el total en una variable global e imprimo en la vista el totalEstudiantes (variable)
          this.totalDocentesHombres = this.totalDocentesHombres + c.hombres;
          this.totalDocentesMujeres = this.totalDocentesMujeres + c.mujeres;

        });
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.totalDocentes = 0;
    this.totalDocentesHombres = 0;
    this.totalDocentesMujeres = 0;
    this.dataSource.filteredData.forEach((total: any) => {
      this.totalDocentes += total.total;
      this.totalDocentesHombres += total.hombres;
      this.totalDocentesMujeres += total.mujeres;
    })

  }

}
