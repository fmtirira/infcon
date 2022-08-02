import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CrearDirectivoComponent } from './crear-directivo/crear-directivo.component';

//tabla
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios } from 'src/app/models/user';
import { EditarDirectivoComponent } from './editar/editar-directivo/editar-directivo.component';
import { AdministradorService } from 'src/app/services/administrador.service';

import { DialogdConfirmarComponent } from './editar/dialogd-confirmar/dialogd-confirmar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-directivo',
  templateUrl: './listar-directivo.component.html',
  styleUrls: ['./listar-directivo.component.css']
})
export class ListarDirectivoComponent implements OnInit {
  activar = false;
  datosDirectivo: Usuarios = {
    uid: '',
    email: '',
    clave: '',
    cedula: '',
    apellidos: '',
    nombres: '',
    nomProvincia: '',
    emailVerified: true,
    roles: 'directivo'
  }
  displayedColumns: string[] = ['numero', 'nombres', 'apellidos', 'email', 'cedula', 'roles', 'accion'];
  dataSource = new MatTableDataSource();
  usuarios: Usuarios[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public authService: AuthService,
    private router: Router,
    public auth: AngularFireAuth,
    public adminService: AdministradorService,
    private dialogd: MatDialog
  ) {
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
  ngOnInit(): void {

    this.adminService.GetAllUsuarios()
      .subscribe(usuario => {
        this.dataSource.data = usuario
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      });
    this.authService.GetUid();
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

  //form dialogo
  OpenDialog() {
    this.dialogd.open(CrearDirectivoComponent, {
      width: '35%'
    });
  }

  OpenDialogEditar() {
    this.dialogd.open(EditarDirectivoComponent, {
      width: '35%'

    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  OpenDialogConfirmar(): void {
    this.dialogd.open(DialogdConfirmarComponent);
  }
}

