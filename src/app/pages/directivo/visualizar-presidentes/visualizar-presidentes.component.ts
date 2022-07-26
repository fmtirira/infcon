import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Provincias } from 'src/app/models/provincia.interface';
import { Usuarios } from 'src/app/models/user';
import { AdministradorService } from 'src/app/services/administrador.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { UsupresidentesService } from 'src/app/services/usupresidentes.service';

@Component({
  selector: 'app-visualizar-presidentes',
  templateUrl: './visualizar-presidentes.component.html',
  styleUrls: ['./visualizar-presidentes.component.css'],
  providers: [ProvinciaService]
})
export class VisualizarPresidentesComponent implements OnInit {
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
  displayedColumns: string[] = ['numero', 'nombres', 'apellidos', 'email', 'nomProvincia', 'cedula', 'roles'];
  dataSource = new MatTableDataSource();
  usuarios: Usuarios[] = [];
  totalPresidentes = 0;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
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
            if (rolesV.roles === 'directivo') {
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
        this.dataSource.data = usuario;
        this.totalPresidentes = 0;
        this.totalPresidentes += usuario.length;
      });
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.totalPresidentes = 0;
    this.totalPresidentes += this.dataSource.filteredData.length;
  }

}
