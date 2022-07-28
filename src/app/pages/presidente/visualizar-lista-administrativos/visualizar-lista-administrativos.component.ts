import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CifrasAdministrativoI } from 'src/app/models/cifrasAdministrativo.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CifrasAdministrativosService } from 'src/app/services/cifras-administrativos.service';

@Component({
  selector: 'app-visualizar-lista-administrativos',
  templateUrl: './visualizar-lista-administrativos.component.html',
  styleUrls: ['./visualizar-lista-administrativos.component.css']
})
export class VisualizarListaAdministrativosComponent implements OnInit {
  activar = false;
  displayedColumns: string[] = ['numero', 'nomInstitucion', 'adminHombres', 'adminMujeres', 'adminTotal'];
  administrativos: CifrasAdministrativoI[] = [];
  dataSource = new MatTableDataSource();
  cifrasAdministrativos: any[] = [];
  uid: any;
  provincia: any;
  totalAdministrativos = 0;
  totalAdministrativosHombres = 0;
  totalAdministrativosMujeres = 0;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private authService: AuthService,
    public cifrasAdService: CifrasAdministrativosService,
    public toastr: ToastrService,
  ) {
    this.authService.StateUser().subscribe(idA => {
      if (idA) {
        this.getUid();
        this.authService.GetDoc<Usuarios>('Usuarios', idA.uid).subscribe(rolesV => {
          if (rolesV) {
            if (rolesV.roles === 'presidente') {
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

  }
  async getUid() {
    const uid = await this.authService.GetUid();
    if (uid) {
      this.uid = uid;
      this.getInfoUser();
    } else {
      console.log('no existe uid');
    }
  }
  getInfoUser() {
    const path = 'Usuarios';
    const id = this.uid;
    this.authService.GetDoc<Usuarios>(path, id).subscribe(resUsuario => {
      this.provincia = resUsuario?.nomProvincia;

      this.cifrasAdService.GetAdministrativosProvincia(this.provincia)
        .subscribe(administrativosDatos => {
          this.cifrasAdministrativos = [];
          administrativosDatos.forEach((element: any) => {
            this.cifrasAdministrativos.push({
              idAdmin: element.payload.doc.idAdmin,
              ...element.payload.doc.data()
            })
          })

          this.dataSource.data = this.cifrasAdministrativos;
          this.totalAdministrativos = 0;
          this.totalAdministrativosHombres = 0;
          this.totalAdministrativosMujeres = 0;
          this.cifrasAdministrativos.forEach(total => {
            this.totalAdministrativos = this.totalAdministrativos + total.adminTotal; //acumulo el total en una variable global e imprimo en la vista el totalEstudiantes (variable)
            this.totalAdministrativosHombres = this.totalAdministrativosHombres + total.adminHombres;
            this.totalAdministrativosMujeres = this.totalAdministrativosMujeres + total.adminMujeres;
          })
        });
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.totalAdministrativos = 0;
    this.totalAdministrativosHombres = 0;
    this.totalAdministrativosMujeres = 0;
    this.dataSource.filteredData.forEach((total: any) => {
      this.totalAdministrativos += total.adminTotal;
      this.totalAdministrativosHombres += total.adminHombres;
      this.totalAdministrativosMujeres += total.adminMujeres;
    })
  }

}
