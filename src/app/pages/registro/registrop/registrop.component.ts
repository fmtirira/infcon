import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuarios } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { DialogpComponent } from '../dialogp/dialogp.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Provincias } from 'src/app/models/provincia.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AdministradorService } from 'src/app/services/administrador.service';
import { DialogpeditarComponent } from '../editar/dialogpeditar/dialogpeditar.component';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { ToastrService } from 'ngx-toastr';
import { DialogpConfirmarComponent } from '../editar/dialogp-confirmar/dialogp-confirmar.component';
import { UsupresidentesService } from 'src/app/services/usupresidentes.service';

@Component({
  selector: 'app-registrop',
  templateUrl: './registrop.component.html',
  styleUrls: ['./registrop.component.css'],
  providers: [ProvinciaService]
})
export class RegistropComponent implements OnInit {
  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = [];
  datosPresidente: Usuarios = {
    uid: '',
    email: '',
    clave: '',
    cedula: '',
    apellidos: '',
    nombres: '',
    nomProvincia: '',
    emailVerified: true,
    /*roles:{
      admin:false,
      presidente:true,
      directivo:false,
      secretarioRector:false
    }*/
    roles: 'presidente'
  }
  displayedColumns: string[] = ['numero', 'nombres', 'apellidos', 'email', 'nomProvincia', 'cedula', 'roles','accion'];
  dataSource = new MatTableDataSource();
  usuarios: Usuarios[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterCargo = 'presidente';
  constructor(
    private dialog: MatDialog,
    public provinciaSvc: ProvinciaService,
    private authService: AuthService,
    public auth: AngularFireAuth,
    public toastr: ToastrService,
    public adminService: AdministradorService,
    public usupresiSvc: UsupresidentesService

  ) { }
  /*ngAfterViewInit() {
    if (this.datosPresidente.roles == 'presidente') {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }*/
  
  ngOnInit(): void {
    this.provincias = this.provinciaSvc.GetProvincias();
    this.usupresiSvc.GetAllUsuarios()
      .subscribe(usuario => this.dataSource.data = usuario);
    this.dataSource.paginator = this.paginator;
  }

  OnEdit(element: any) {
    this.OpenDialogEditar();
    if (element) {
      this.adminService.usuarioSelected = Object.assign({}, element);
    }
  }

  OnDelete(element: any) {
    this.OpenDialogConfirmar();
    if (element) {
      this.adminService.usuarioSelectedBorrar = Object.assign({}, element);
    }
  }
  
  OpenDialogp() {
    this.dialog.open(DialogpComponent, {
      width: '35%'
    });
  }
  //editar dialogo
  OpenDialogEditar() {
    this.dialog.open(DialogpeditarComponent, {
      width: '35%'
      //maxWidth: '610px'
    });
  }

  OpenDialogConfirmar(): void {
    this.dialog.open(DialogpConfirmarComponent);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Filter() {
    //const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = 'presidente';
  }
 
}
