import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DialogrecsecreComponent } from '../dialogrecsecre/dialogrecsecre.component';

import { AdministradorService } from 'src/app/services/administrador.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogrecseceditarComponent } from '../editar/dialogrecseceditar/dialogrecseceditar.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DialogrecsecreConfirmarComponent } from '../editar/dialogrecsecre-confirmar/dialogrecsecre-confirmar.component';
import { UsurectorsecreService } from 'src/app/services/usurectorsecre.service';

@Component({
  selector: 'app-registrorectorsecre',
  templateUrl: './registrorectorsecre.component.html',
  styleUrls: ['./registrorectorsecre.component.css']
})
export class RegistrorectorsecreComponent implements OnInit {
  public SelectedInstitucion: InstitucionesI = { idInstitucion: '', nomInstitucion: '', codigoAMIE: '', nomProvincia: '' };
  displayedColumns: string[] = ['numero', 'nombresRector', 'nombresSecretaria', 'email', 'nomInstitucion', 'roles', 'accion'];
  dataSource = new MatTableDataSource();
  instituciones: InstitucionesI[] = [];
  usuarios: Usuarios[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  datosRectorSecre: Usuarios = {
    uid: '',
    email: '',
    clave: '',
    apellidos: '',
    nombres: '',
    nomProvincia: '',
    nomInstitucion: '',
    emailVerified: true,
    /*roles:{
      secretarioRector:true
    }*/
    roles: 'secretarioRector'
  }

  constructor(private authService: AuthService,
    public auth: AngularFireAuth,
    public adminService: AdministradorService,
    public rectorSecreSvc: UsurectorsecreService,
    private dialogrecsecre: MatDialog,
    private afs: AngularFirestore
  ) { }

  ngAfterViewInit() {
    //if (this.datosRectorSecre.roles === 'secretarioRector') {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //}

  }
  ngOnInit(): void {
    //this.GetPresidentes();
    this.rectorSecreSvc.GetAllUsuarios()
      .subscribe(usuario => this.dataSource.data = usuario);
    this.dataSource.paginator = this.paginator;

    /*this.adminService.GetDirectivos().subscribe((res) => {
 this.usuarios = res.map((e) => {
   return {
     //asignamos el id y los datos de cada usuario
     id: e.payload.doc.id,
     ...(e.payload.doc.data() as Usuarios) //react-los 3 puntitos simplifica la recogida de valores en una estructura de datos (arreglos)
   };
 });
});*/
  }


  DeleteRow = (usuario: Usuarios) => this.adminService.EliminarUsuario(usuario);

  OpenDialogRecsecre() {
    this.dialogrecsecre.open(DialogrecsecreComponent, {
      width: '45%'
    });
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
  //editar dialogo
  OpenDialogEditar() {
    this.dialogrecsecre.open(DialogrecseceditarComponent, {
      width: '35%'
      //maxWidth: '610px'
    });
  }
  OpenDialogConfirmar(): void {
    this.dialogrecsecre.open(DialogrecsecreConfirmarComponent);
  }

  //filtrar
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
