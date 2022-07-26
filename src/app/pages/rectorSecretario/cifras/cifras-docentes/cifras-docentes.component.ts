import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { CifrasDocentesI } from 'src/app/models/cifrasDocentes.interface';
import { InstitucionesI, NivelDocentes } from 'src/app/models/institucion.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CifraDocenteService } from 'src/app/services/cifra-docente.service';
import { CifrasDocentesService } from 'src/app/services/cifras-docentes.service';
import { InstitucionesService } from 'src/app/services/instituciones.service';

@Component({
  selector: 'app-cifras-docentes',
  templateUrl: './cifras-docentes.component.html',
  styleUrls: ['./cifras-docentes.component.css']
})
export class CifrasDocentesComponent implements OnInit {
  activar = false;
  public InstitucionCollection!: AngularFirestoreCollection<InstitucionesI>;
  public InstitucionDocument!: AngularFirestoreDocument<InstitucionesI>;
  public InstitucionInfo!: Observable<any[]>;
  private subscription: Subscription = new Subscription;
  uid: any = ''; //uid del Usuario
  idInstitucion: string = '';
  info!: Usuarios; // traer la info a la vista
  infoInstitucion: InstitucionesI[] = [];
  infoInsti!: InstitucionesI;
  mujeres = 0;
  hombres = 0;
  total!: number;
  sumaTotal: any;
  sumaMujeres: any;
  sumaHombres: any;
  datosNivelesInsti: any[] = [];

  dataDocente: CifrasDocentesI[] = [];
  cifrasDocentes!: any[];
  //actualizar la data de instituciones
  clonedNivel: { [s: string]: CifrasDocentesI; } = {};
  //form
  docentesForm: FormGroup;

  constructor(
    public afs: AngularFirestore,
    private router: Router,
    public authService: AuthService,
    public toastr: ToastrService,
    public instiService: InstitucionesService,
    private cifrasDService: CifraDocenteService,
    private cifrasDsService: CifrasDocentesService,
    private formBuilder: FormBuilder
  ) {
    this.docentesForm = this.formBuilder.group({
      uid: (null),
      nomNivelEducacion: ['', Validators.required],
      hombres: ['', Validators.required],
      mujeres: ['', Validators.required],
      total: (null)
    });
    this.authService.StateUser().subscribe(idA => {
      if (idA) {
        this.getUid();
      }
    });
  }

  ngOnInit() {

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
    this.authService.GetDoc<Usuarios>(path, id).subscribe(res => {
      if (res) {
        if (res.roles === 'secretarioRector') {
          this.activar = true;
        }
        else {
          this.activar = false;
          this.router.navigate(['/inicio']);
        }
        this.info = res;
        const pathI = 'Instituciones';
        this.InstitucionCollection = this.afs.collection(pathI);

        this.authService.GetDoc<InstitucionesI>(pathI, this.info.idInstitucion).subscribe(resInsti => {
          if (resInsti) {
            this.infoInsti = resInsti;
            this.idInstitucion = resInsti?.idInstitucion;
            this.subscription.add(
              this.cifrasDService.GetAllCifrasDocentes(this.idInstitucion).subscribe(cifrasD => {
                this.cifrasDocentes = [];
                cifrasD.forEach((element: any) => {
                  this.cifrasDocentes.push({
                    uid: element.payload.doc.uid,
                    ...element.payload.doc.data()
                  })
                })
                this.dataDocente = this.cifrasDocentes;

                this.sumaTotal = this.dataDocente.map(items => items.total).reduce((prev, curr) => prev + curr, 0);

                this.sumaMujeres = this.dataDocente.map(items => items.mujeres).reduce((prev, curr) => prev + curr, 0);
                this.sumaHombres = this.dataDocente.map(items => items.hombres).reduce((prev, curr) => prev + curr, 0);
              })
            )
          }
        });
      }
    });
  }


  onRowEditInit(docentesCifras: CifrasDocentesI) {
    this.clonedNivel[docentesCifras.uid] =
      { ...docentesCifras };
  }

  onRowEditSave(cifrasD: CifrasDocentesI) {
    if (cifrasD.hombres > 0 && cifrasD.mujeres > 0 && cifrasD.hombres < 1000 && cifrasD.mujeres < 1000) {
      this.total = parseInt(cifrasD.hombres) + parseInt(cifrasD.mujeres);
      cifrasD.total = this.total;
      this.infoInsti.idInstitucion = this.info.idInstitucion;
      this.afs.collection("CifrasDocentes").doc(cifrasD.uid).update({
        hombres: cifrasD.hombres,
        mujeres: cifrasD.mujeres,
        total: cifrasD.total,
      }).then(() => {
        this.toastr.success('Registro actualizado exitosamente', '');
      });
    }
    else {
      this.toastr.error('Error al actualizar el registro', 'ERROR');
      delete this.dataDocente[cifrasD.uid];
    }

  }

  onRowEditCancel(cifrasD: CifrasDocentesI, index: number) {
    this.dataDocente[index] = this.clonedNivel[cifrasD.uid];
    delete this.dataDocente[cifrasD.uid];
  }
}
