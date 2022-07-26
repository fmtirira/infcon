import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RepresentanteService } from 'src/app/services/representante.service';
import { RepresentantesService } from 'src/app/services/representantes.service';
import { CrearRepresentanteComponent } from '../crear-representante/crear-representante.component';
import { DialogrepConfirmarComponent } from '../dialogrep-confirmar/dialogrep-confirmar.component';
import { EditarRepresentanteComponent } from '../editar-representante/editar-representante.component';
@Component({
  selector: 'app-listar-representantes',
  templateUrl: './listar-representantes.component.html',
  styleUrls: ['./listar-representantes.component.css']
})
export class ListarRepresentantesComponent implements OnInit {
  private subscription: Subscription = new Subscription;
  infoUsu!: Usuarios;
  idInstitucion!: string;
  idUsu!: any;
  displayedColumns: string[] = ['numero', 'prefijo', 'nombres', 'apellidos', 'cargo', 'email', 'telefono', 'celular', 'nomInstitucion', 'accion'];
  dataSource = new MatTableDataSource();
  representantes: any[] = [];
  instituciones: InstitucionesI[] = []; //el array donde se almacena lo que se lee en firestore
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    public representanteService: RepresentantesService,
    public representanteSvc: RepresentanteService,
    public toastr: ToastrService,
    private dialogRepre: MatDialog
  ) {
    this.RecuperarData();
  }

  ngOnInit() {

    this.GetRepre();
  }
  async GetRepre() {
    const idUsuario = await this.authService.GetUid();
    if (idUsuario) {
      this.idUsu = idUsuario;
      this.getDoc<Usuarios>('Usuarios', this.idUsu).subscribe(resUsuario => {
        if (resUsuario) {
          this.infoUsu = resUsuario;
          this.idInstitucion = resUsuario.idInstitucion;
          this.subscription.add(
            this.representanteSvc.GetAllRepresentantes(this.idInstitucion).subscribe(data => {
              this.representantes = [];
              data.forEach((element: any) => {
                this.representantes.push({
                  uid: element.payload.doc.uid,
                  ...element.payload.doc.data()
                })
              })
              this.dataSource.data = this.representantes;
            }))
          this.dataSource.paginator = this.paginator;
        }
      })
    }
  }

  RecuperarData() {
    this.idUsu = <string>sessionStorage.getItem('uid');
    this.idInstitucion = <string>sessionStorage.getItem('idInstitucion');
  }
  OnEdit(element: any) {
    this.OpenDialogrepEdit();
    if (element) {
      this.representanteService.representanteSelected = Object.assign({}, element);
    }
  }

  OnDelete(element: any) {
    this.OpenDialogConfirmar();
    if (element) {
      this.representanteService.repreSelectedBorrar = Object.assign({}, element);
    }
  }

  OpenRepresentante() {
    this.dialogRepre.open(CrearRepresentanteComponent, {
      width: '80%'
    });
  }

  OpenDialogrepEdit() {
    this.dialogRepre.open(EditarRepresentanteComponent, {
      width: '60%'
    });
  }
  OpenDialogConfirmar(): void {
    this.dialogRepre.open(DialogrepConfirmarComponent);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getDoc<InstitucionesI>(path: string, id: any) {
    return this.afs.collection(path).doc<InstitucionesI>(id).valueChanges()
  }
}
