import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { Provincias } from 'src/app/models/provincia.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { InstitucionesService } from 'src/app/services/instituciones.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { ExporterService } from 'src/app/services/exporter.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-visualizar-lista-instituciones',
  templateUrl: './visualizar-lista-instituciones.component.html',
  styleUrls: ['./visualizar-lista-instituciones.component.css'],
  providers: [ProvinciaService]
})
export class VisualizarListaInstitucionesComponent implements OnInit {
  activar = false;
  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = [];
  displayedColumns: string[] = ['numero', 'codigoAMIE', 'nomInstitucion', 'nomProvincia', 'direccionInstitucion', 'jornada', 'zonaInec', 'jurisdiccion', 'modalidad', 'sostenimiento'];
  dataSource = new MatTableDataSource();
  info!: InstitucionesI;
  instituciones: any[] = []; //el array donde se almacena lo que se lee en firestore
  uid: any;
  provincia: any;
  totalInstituciones = 0;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private authService: AuthService,
    public provinciaSvc: ProvinciaService,
    public institucionService: InstitucionesService,
    public toastr: ToastrService,
    private exportService: ExporterService
  ) {this.authService.StateUser().subscribe(idA => {
    if (idA) {
      this.authService.GetDoc<Usuarios>('Usuarios', idA.uid).subscribe(rolesV => {
        if (rolesV) {
          if (rolesV.roles === 'presidente') {
            this.activar = true;
          }
          else {
            this.activar = false;
            this.router.navigate(['/inicio']);
          }
        }
      })
    }
  }); }

  ngOnInit(): void {
    this.provincias = this.provinciaSvc.GetProvincias();
    this.getUid();

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
  getInfoUser() {
    const path = 'Usuarios';
    const id = this.uid;
    this.authService.GetDoc<Usuarios>(path, id).subscribe(resUsuario => {
      this.provincia = resUsuario?.nomProvincia;
      this.institucionService.GetAllInstitucionesProvincia(this.provincia)
        .subscribe(institucionesDatos => {
          this.instituciones = [];
          institucionesDatos.forEach((element: any) => {
            this.instituciones.push({
              uid: element.payload.doc.uid,
              ...element.payload.doc.data()
            })
          })

          this.dataSource.data = this.instituciones;
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
          }, 0);
          this.totalInstituciones = 0;
          this.totalInstituciones += this.instituciones.length;
        });
      

    })

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.totalInstituciones = 0;
    this.totalInstituciones += this.dataSource.filteredData.length;
  }

  ExportarAsXLSX() {
    this.exportService.exportToExcel(this.dataSource.data, 'instituciones');
  }
  ExportarAsXLSXFiltered() {
    this.exportService.exportToExcel(this.dataSource.filteredData, 'instituciones');
  }

}
