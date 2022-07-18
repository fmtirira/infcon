import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { Provincias } from 'src/app/models/provincia.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DialogosService } from 'src/app/services/dialogos.service';
import { InstitucionesService } from 'src/app/services/instituciones.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

@Component({
  selector: 'app-visualizar-instituciones',
  templateUrl: './visualizar-instituciones.component.html',
  styleUrls: ['./visualizar-instituciones.component.css'],
  providers: [ProvinciaService]
})
export class VisualizarInstitucionesComponent implements OnInit {

  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = [];
  displayedColumns: string[] = ['numero', 'codigoAMIE', 'nomInstitucion', 'nomProvincia', 'direccionInstitucion', 'jornada', 'zonaInec', 'jurisdiccion','modalidad', 'sostenimiento'];
  dataSource = new MatTableDataSource();
  instituciones: InstitucionesI[] = []; //el array donde se almacena lo que se lee en firestore
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService,
    public provinciaSvc: ProvinciaService,
    public institucionService: InstitucionesService,
    public dialogoService: DialogosService,
    public toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.provincias = this.provinciaSvc.GetProvincias();
    this.institucionService.GetAllInstituciones()
      .subscribe(institucion => {
        this.dataSource.data = institucion;
      });
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
