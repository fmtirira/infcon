import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

import { DialogiComponent } from '../dialogi/dialogi.component';
import { DialogiConfirmarComponent } from '../editar/dialogi-confirmar/dialogi-confirmar.component';
import { DialogieditarComponent } from '../editar/dialogieditar/dialogieditar.component'; 

@Component({
  selector: 'app-registroinstitucion',
  templateUrl: './registroinstitucion.component.html',
  styleUrls: ['./registroinstitucion.component.css'],
  providers: [ProvinciaService]
})
export class RegistroinstitucionComponent implements OnInit {
  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = [];
  displayedColumns: string[] = ['numero', 'codigoAMIE', 'nomInstitucion', 'nomProvincia', 'accion'];
  dataSource = new MatTableDataSource();
  instituciones: InstitucionesI[] = []; //el array donde se almacena lo que se lee en firestore
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  datosInstitucion: InstitucionesI = {
    idInstitucion: '',
    //sale en el crud
    codigoAMIE: '',
    nomInstitucion: '',
    direccionInstitucion: '',
    //matutina y vespertina
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
    public institucionService: InstitucionesService,
    public dialogoService: DialogosService,
    public toastr: ToastrService,
    private dialogi: MatDialog) { }

  ngOnInit(): void {
    this.provincias = this.provinciaSvc.GetProvincias();
    this.institucionService.GetAllInstituciones()
      .subscribe(institucion => 
        {this.dataSource.data = institucion
          //console.log('datos institucion', this.dataSource.data);
        }
        );       
    this.dataSource.paginator = this.paginator;   
  }

  OnEdit(element: any) {
    this.OpenDialogiEdit();
    if (element) {
      this.institucionService.instiSelected = Object.assign({}, element);
    }
  }

  OnDelete(element: any){
  this.OpenDialogConfirmar();
  if(element){
    this.institucionService.instiSelectedBorrar = Object.assign({}, element);
  }
  }

  OpenDialogi() {
    this.dialogi.open(DialogiComponent, {
      width: '35%'
    });
  }

  OpenDialogiEdit() {
    this.dialogi.open(DialogieditarComponent, {
      width: '35%'
    });
  }
  OpenDialogConfirmar(): void{
    this.dialogi.open(DialogiConfirmarComponent);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
