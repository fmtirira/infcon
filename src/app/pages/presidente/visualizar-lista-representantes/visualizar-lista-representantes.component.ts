import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { Provincias } from 'src/app/models/provincia.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { InstitucionesService } from 'src/app/services/instituciones.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { RepresentantesService } from 'src/app/services/representantes.service';

@Component({
  selector: 'app-visualizar-lista-representantes',
  templateUrl: './visualizar-lista-representantes.component.html',
  styleUrls: ['./visualizar-lista-representantes.component.css'],
  providers: [ProvinciaService]
})
export class VisualizarListaRepresentantesComponent implements OnInit {
  activar = false;
  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = [];
  displayedColumns: string[] = ['numero', 'prefijo', 'nombres', 'apellidos', 'cargo', 'email', 'telefono', 'celular', 'nomInstitucion','nomProvincia'];
  dataSource = new MatTableDataSource();
  representantes: any[] = [];
  uid: any;
  provincia: any;
  instituciones: InstitucionesI[] = []; //el array donde se almacena lo que se lee en firestore
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private authService: AuthService,
    private afs: AngularFirestore,
    private router:Router,
    public provinciaSvc: ProvinciaService,
    public institucionService: InstitucionesService,
    public representantesService: RepresentantesService,
    public toastr: ToastrService,) {
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
    this.provincias = this.provinciaSvc.GetProvincias();
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
      this.representantesService.GetRepresentantesProvincia(this.provincia)
        .subscribe(representantesDatos => {
          this.representantes = [];
          representantesDatos.forEach((element: any) => {
            this.representantes.push({
              uid: element.payload.doc.uid,
              ...element.payload.doc.data()
            })
          })
          this.dataSource.data = this.representantes;
        });
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 /*  getDoc<Usuarios>(path: string, id: any) {
    return this.afs.collection(path).doc<Usuarios>(id).valueChanges()
  } */
}
