import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CifrasEstudiantesI } from 'src/app/models/cifrasEstudiantes.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CifrasEstudiantesService } from 'src/app/services/cifras-estudiantes.service';

@Component({
  selector: 'app-visualizar-lista-estudiantes',
  templateUrl: './visualizar-lista-estudiantes.component.html',
  styleUrls: ['./visualizar-lista-estudiantes.component.css']
})
export class VisualizarListaEstudiantesComponent implements OnInit {
  activar = false;
  displayedColumns: string[] = ['numero', 'nomInstitucion', 'nomNivelEducacion', 'hombres', 'mujeres', 'total'];
  estudiantes: CifrasEstudiantesI[] = [];
  dataSource = new MatTableDataSource();
  cifrasEstudiantes: any[] = [];
  uid: any;
  provincia: any;
  totalEstudiantes = 0;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private authService: AuthService,
    private cifrasEService: CifrasEstudiantesService
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
    this.authService.GetDoc<Usuarios>(path, id).subscribe(resUsuario => {
      this.provincia = resUsuario?.nomProvincia;
      this.cifrasEService.GetEstudiantesProvincia(this.provincia)
        .subscribe(estudiantesDatos => {
          this.cifrasEstudiantes = [];
          estudiantesDatos.forEach((element: any) => {
            this.cifrasEstudiantes.push({
              uid: element.payload.doc.uid,
              ...element.payload.doc.data()
            })
          })
          this.dataSource.data = this.cifrasEstudiantes;
          this.totalEstudiantes = 0;
          this.cifrasEstudiantes.forEach(total => {
            this.totalEstudiantes = this.totalEstudiantes + total.total;
          })
        });
        
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.totalEstudiantes = 0;
    this.dataSource.filteredData.forEach((total:any)=>{
      this.totalEstudiantes +=total.total;
    })
  }

}
