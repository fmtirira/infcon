import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { Provincias } from 'src/app/models/provincia.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { InstitucionesService } from 'src/app/services/instituciones.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

@Component({
  selector: 'app-visualizar-instituciones',
  templateUrl: './visualizar-instituciones.component.html',
  styleUrls: ['./visualizar-instituciones.component.css'],
  providers: [ProvinciaService]
})
export class VisualizarInstitucionesComponent implements OnInit {
  activar = false;
  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = [];
  displayedColumns: string[] = ['numero', 'codigoAMIE', 'nomInstitucion', 'nomProvincia', 'direccionInstitucion', 'jornada', 'zonaInec', 'jurisdiccion', 'modalidad', 'sostenimiento'];
  dataSource = new MatTableDataSource();
  instituciones: InstitucionesI[] = []; //el array donde se almacena lo que se lee en firestore
  totalInstituciones = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService,
    private router: Router,
    public provinciaSvc: ProvinciaService,
    public institucionService: InstitucionesService,
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
    this.institucionService.GetAllInstituciones()
      .subscribe(institucion => {
        this.dataSource.data = institucion;
        this.totalInstituciones = 0;
        this.totalInstituciones += institucion.length;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.totalInstituciones = 0;
    this.totalInstituciones += this.dataSource.filteredData.length;
  }

}
