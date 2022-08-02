import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { RepresentantesService } from 'src/app/services/representantes.service';

@Component({
  selector: 'app-visualizar-representantes',
  templateUrl: './visualizar-representantes.component.html',
  styleUrls: ['./visualizar-representantes.component.css'],
  providers: [ProvinciaService]
})
export class VisualizarRepresentantesComponent implements OnInit {
  activar = false;
  displayedColumns: string[] = ['numero', 'prefijo', 'nombres', 'apellidos', 'cargo', 'email', 'telefono', 'celular', 'nomInstitucion'];
  dataSource = new MatTableDataSource();
  representantes: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private authService:AuthService,
    private router: Router,
    private afs: AngularFirestore,
    public representanteService: RepresentantesService,
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

  ngOnInit() {
    this.representanteService.GetAllRepresentantes()
      .subscribe(representante => {
        this.dataSource.data = representante;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      });
   

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getDoc<InstitucionesI>(path: string, id: any) {
    return this.afs.collection(path).doc<InstitucionesI>(id).valueChanges()
  }

}
