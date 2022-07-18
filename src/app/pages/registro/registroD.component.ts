import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DialogdComponent } from './dialogd/dialogd.component';
 
//tabla
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios } from 'src/app/models/user';
import { DialogdeditarComponent } from './editar/dialogdeditar/dialogdeditar.component';
import { AdministradorService } from 'src/app/services/administrador.service';

import { DialogdConfirmarComponent } from './editar/dialogd-confirmar/dialogd-confirmar.component';

@Component({
  selector: 'app-registroD',
  templateUrl: './registroD.component.html',
  styleUrls: ['./registroD.component.css']
})
export class RegistroDComponent implements OnInit {
  datosDirectivo: Usuarios = {
    uid: '',
    email: '',
    clave: '',
    cedula: '',
    apellidos: '',
    nombres: '',
    nomProvincia:'',
    emailVerified: true,
    /*roles:{
      directivo:true
    }*/
    roles:'directivo'
  }
  displayedColumns: string[] = ['numero', 'nombres', 'apellidos', 'email', 'cedula', 'roles','accion'];
  dataSource = new MatTableDataSource();
  usuarios: Usuarios[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;  
  @ViewChild(MatSort) sort!: MatSort; 

  constructor(
    public authService: AuthService,
    public auth: AngularFireAuth,
    public adminService: AdministradorService,
    private dialogd: MatDialog
  ) { }
  filterCargo = 'directivo';
  filterUsuario = '';
  ngOnInit(): void {    
    this.adminService.GetAllUsuarios()
      .subscribe(usuario => this.dataSource.data = usuario);
    this.dataSource.paginator = this.paginator;
    this.authService.GetUid();
    /*this.authService.GetCollection<Usuarios>('Usuarios').subscribe(res => {
      this.usuarios = res;
      this.authService.GetUid();
      return this.datosDirectivo;
    });
    this.adminService.GetDirectivos().subscribe((res) => {
      //      
      this.usuarios = res.map((e) => {
        return {
          //asignamos el id y los datos de cada usuario
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Usuarios) //react-los 3 puntitos simplifica la recogida de valores en una estructura de datos (arreglos)
        };
      });

    });*/
  }
  OnEdit(element: any) {
    this.OpenDialogEditar();
    if (element) {
      //pasa los elementos al form 
      this.adminService.usuarioSelected = Object.assign({}, element);
    }
  }

  OnDelete(element: any) {
    this.OpenDialogConfirmar();
    if (element) {
      this.adminService.usuarioSelectedBorrar = Object.assign({}, element);
    }
  }
  //no estoy usando
  DeleteRow = (usuario: Usuarios) => this.adminService.EliminarUsuario(usuario);


  //form dialogo
  OpenDialog() {
    this.dialogd.open(DialogdComponent, {
      width: '35%'      
    });
  }
 
  OpenDialogEditar() {
    this.dialogd.open(DialogdeditarComponent, {
      width: '35%'
      
    });
  }
  /*GetDirectivos() {
    this.authService.GetCollection<Usuarios>('Usuarios').subscribe(res => {
      console.log('lectura', res);
      this.usuarios = res;
    })
  }
  EditarDirectivo(element: any) {
    this.OpenDialogEditar();
    if (element) {
      this.adminService.directivoSelected = Object.assign({}, element);
    }
  }*/

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  OpenDialogConfirmar(): void {
    this.dialogd.open(DialogdConfirmarComponent);
  }
}

