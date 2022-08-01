import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuarios } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { CrearPresidenteComponent } from '../crear-presidente/crear-presidente.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Provincias } from 'src/app/models/provincia.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AdministradorService } from 'src/app/services/administrador.service';
import { EditarPresidenteComponent } from '../editar/editar-presidente/editar-presidente.component';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { ToastrService } from 'ngx-toastr';
import { DialogpConfirmarComponent } from '../editar/dialogp-confirmar/dialogp-confirmar.component';
import { UsupresidentesService } from 'src/app/services/usupresidentes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-presidente',
  templateUrl: './listar-presidente.component.html',
  styleUrls: ['./listar-presidente.component.css'],
  providers: [ProvinciaService]
})
export class ListarPresidenteComponent implements OnInit {
  activar = false;
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
    roles: 'presidente'
  }
  displayedColumns: string[] = ['numero', 'nombres', 'apellidos', 'email', 'nomProvincia', 'cedula', 'roles', 'accion'];
  dataSource = new MatTableDataSource();
  usuarios: Usuarios[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    public provinciaSvc: ProvinciaService,
    private authService: AuthService,
    public auth: AngularFireAuth,
    public toastr: ToastrService,
    public adminService: AdministradorService,
    public usupresiSvc: UsupresidentesService

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
    this.provincias = this.provinciaSvc.GetProvincias();
    this.usupresiSvc.GetAllUsuarios()
      .subscribe(usuario => {
        if (usuario) {
          this.dataSource.data = usuario;
        }
      });
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
    this.dialog.open(CrearPresidenteComponent, {
      width: '35%'
    });
  }
  //editar dialogo
  OpenDialogEditar() {
    this.dialog.open(EditarPresidenteComponent, {
      width: '35%'
    });
  }

  OpenDialogConfirmar(): void {
    this.dialog.open(DialogpConfirmarComponent);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
