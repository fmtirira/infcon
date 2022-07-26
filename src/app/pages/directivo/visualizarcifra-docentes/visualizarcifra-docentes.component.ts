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
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
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
        this.totalDocentes += this.docentes.length;
      });
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.totalDocentes = 0;
    this.totalDocentes += this.dataSource.filteredData.length;
  }

}
