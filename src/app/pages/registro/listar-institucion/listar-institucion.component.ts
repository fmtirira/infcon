import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

import { CrearInstitucionComponent } from '../crear-institucion/crear-institucion.component';
import { DialogiConfirmarComponent } from '../editar/dialogi-confirmar/dialogi-confirmar.component';
import { EditardInstitucionComponent } from '../editar/editard-institucion/editard-institucion.component';

@Component({
  selector: 'app-listar-institucion',
  templateUrl: './listar-institucion.component.html',
  styleUrls: ['./listar-institucion.component.css'],
  providers: [ProvinciaService]
})
export class ListarInstitucionComponent implements OnInit {
  activar = false;
  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = [];
  displayedColumns: string[] = ['numero', 'codigoAMIE', 'nomInstitucion', 'nomProvincia', 'accion'];
  dataSource = new MatTableDataSource();
  instituciones: InstitucionesI[] = []; //el array donde se almacena lo que se lee en firestore
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  datosInstitucion: InstitucionesI = {
    idInstitucion: '',
    codigoAMIE: '',
    nomInstitucion: '',
    direccionInstitucion: '',
    jornada: '',
    jurisdiccion: '',
    modalidad: '',
    tipoEducacio: '',
    sostenimiento: '',
    tenenciaEdificio: '',
    zonaInec: '',
    nomProvincia: '',
    nivelEducacion: '',
  }
  constructor(private authService: AuthService,
    public provinciaSvc: ProvinciaService,
    private router: Router,
    public institucionService: InstitucionesService,
    public toastr: ToastrService,
    private dialogi: MatDialog) {
    this.authService.StateUser().subscribe(idA => {
      if (idA) {
        this.authService.GetDoc<Usuarios>('Usuarios', idA.uid).subscribe(rolesV => {
          if (rolesV) {
            if (rolesV.roles === 'admin') {
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

  ngOnInit() {
    this.institucionService.GetInstituciones()
      .subscribe(institucion => {
        this.instituciones = [];
        institucion.forEach((element: any) => {
          this.instituciones.push({
            uid: element.payload.doc.uid,
            ...element.payload.doc.data()
          })
        })
        this.dataSource.data = this.instituciones;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      });

  }

  OnEdit(element: any) {
    this.OpenDialogiEdit();
    if (element) {
      this.institucionService.instiSelected = Object.assign({}, element);
    }
  }

  OnDelete(element: any) {
    this.OpenDialogConfirmar();
    if (element) {
      this.institucionService.instiSelectedBorrar = Object.assign({}, element);
    }
  }

  OpenDialogi() {
    this.dialogi.open(CrearInstitucionComponent, {
      width: '35%'
    });
  }

  OpenDialogiEdit() {
    this.dialogi.open(EditardInstitucionComponent, {
      width: '35%'
    });
  }
  OpenDialogConfirmar(): void {
    this.dialogi.open(DialogiConfirmarComponent);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
