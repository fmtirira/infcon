import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CrearRectorsecreComponent } from '../crear-rectorsecre/crear-rectorsecre.component';

import { AdministradorService } from 'src/app/services/administrador.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditarRectorsecreComponent } from '../editar/editar-rectorsecre/editar-rectorsecre.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DialogrecsecreConfirmarComponent } from '../editar/dialogrecsecre-confirmar/dialogrecsecre-confirmar.component';
import { UsurectorsecreService } from 'src/app/services/usurectorsecre.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-rectorsecre',
  templateUrl: './listar-rectorsecre.component.html',
  styleUrls: ['./listar-rectorsecre.component.css']
})
export class ListarRectorsecreComponent implements OnInit {
  activar = false;
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
    roles: 'secretarioRector'
  }

  constructor(private authService: AuthService,
    private router: Router,
    public auth: AngularFireAuth,
    public adminService: AdministradorService,
    public rectorSecreSvc: UsurectorsecreService,
    private dialogrecsecre: MatDialog,
    private afs: AngularFirestore
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
    //this.GetPresidentes();
    this.rectorSecreSvc.GetAllUsuarios()
      .subscribe(usuario => this.dataSource.data = usuario);
    this.dataSource.paginator = this.paginator;
  }

  OpenDialogRecsecre() {
    this.dialogrecsecre.open(CrearRectorsecreComponent, {
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
    this.dialogrecsecre.open(EditarRectorsecreComponent, {
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
