import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CifrasDocentesI } from 'src/app/models/cifrasDocentes.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CifrasDocentesService } from 'src/app/services/cifras-docentes.service';

@Component({
  selector: 'app-visualizar-lista-docentes',
  templateUrl: './visualizar-lista-docentes.component.html',
  styleUrls: ['./visualizar-lista-docentes.component.css']
})
export class VisualizarListaDocentesComponent implements OnInit {
  activar= false;
  displayedColumns: string[] = ['numero', 'nomInstitucion', 'nomNivelEducacion', 'hombres', 'mujeres', 'total'];
  docentes: CifrasDocentesI[] = [];
  dataSource = new MatTableDataSource();
  cifrasDocentes: any[] = [];
  uid: any;
  provincia: any;
  totalDocentes = 0;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private authService: AuthService,
    private cifrasDService: CifrasDocentesService,
  ) { 
    this.authService.StateUser().subscribe(idA => {
      if (idA) {
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
    this.getUid();
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
    this.getDoc<Usuarios>(path, id).subscribe(resUsuario => {
      this.provincia = resUsuario?.nomProvincia;
      this.cifrasDService.GetDocentesProvincia(this.provincia)
        .subscribe(docentesDatos => {
          this.cifrasDocentes = [];
          docentesDatos.forEach((element: any) => {
            this.cifrasDocentes.push({
              uid: element.payload.doc.uid,
              ...element.payload.doc.data()
            })
          })
          this.dataSource.data = this.cifrasDocentes;
          this.totalDocentes = 0;
          this.cifrasDocentes.forEach(total => {
            this.totalDocentes = this.totalDocentes + total.total;
          })
        });
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.totalDocentes = 0;
    this.dataSource.filteredData.forEach((total: any) => {
      this.totalDocentes += total.total;
    })
  }
  getDoc<Usuarios>(path: string, id: any) {
    return this.afs.collection(path).doc<Usuarios>(id).valueChanges()
  }

}
