import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CifrasAdministrativoI } from 'src/app/models/cifrasAdministrativo.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CifrasAdministrativosService } from 'src/app/services/cifras-administrativos.service';

@Component({
  selector: 'app-visualizarcifra-administrativos',
  templateUrl: './visualizarcifra-administrativos.component.html',
  styleUrls: ['./visualizarcifra-administrativos.component.css']
})
export class VisualizarcifraAdministrativosComponent implements OnInit {
  activar = false;
  displayedColumns: string[] = ['numero', 'nomInstitucion', 'adminHombres', 'adminMujeres', 'adminTotal'];
  administrativos: CifrasAdministrativoI[] = [];
  dataSource = new MatTableDataSource();
  totalAdministrativos = 0;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private authService: AuthService,
    private router: Router,
    public cifrasAdService: CifrasAdministrativosService,
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
    this.cifrasAdService.GetAllCifrasAdministrativos()
      .subscribe(cifrasAdministrativos => {
        this.administrativos = cifrasAdministrativos;
        this.dataSource.data = this.administrativos;
        this.totalAdministrativos = 0;
        this.totalAdministrativos += this.administrativos.length;
      });
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.totalAdministrativos = 0;
    this.totalAdministrativos += this.dataSource.filteredData.length;
  }

}
