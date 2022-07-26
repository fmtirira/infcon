import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { Nivel } from 'src/app/models/nivelEducacion.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, of, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesService } from 'src/app/services/instituciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CifrasEstudiantesI } from 'src/app/models/cifrasEstudiantes.interface';
import { CifraEstudianteService } from 'src/app/services/cifra-estudiante.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cifras-estudiantes',
  templateUrl: './cifras-estudiantes.component.html',
  styleUrls: ['./cifras-estudiantes.component.css']
})
export class CifrasEstudiantesComponent implements OnInit {
  activar = false;
  public InstitucionCollection!: AngularFirestoreCollection<InstitucionesI>;
  public InstitucionDocument!: AngularFirestoreDocument<InstitucionesI>;
  public InstitucionInfo!: Observable<any[]>;
  private subscription: Subscription = new Subscription;
  public institucionElements: [] = []; //guarda la data de todas las instituciones
  uid: any = ''; //uid del Usuario
  info!: Usuarios; //me permite traer la info a la vista
  infoInstitucion: InstitucionesI[] = [];
  infoInsti!: InstitucionesI;
  //data!: InstitucionesI;
  infoNi!: any; //me permite guardar los object de los niveles
  mujeres = 0;
  hombres = 0;
  total!: number;
  sumaTotal!: number;
  sumaMujeres!: number;
  sumaHombres!: number;
  datosNivelesInsti: any[] = [];
  dataEstudiantes: CifrasEstudiantesI[] = [];
  cifrasEstudiantes!: any[];
  idInstitucion: any;

  //me permitira poder actualizar la data de instituciones
  clonedNivel: { [s: string]: CifrasEstudiantesI; } = {};
  //form
  nivelesForm: FormGroup;
  constructor(
    private router: Router,
    public afs: AngularFirestore,
    public authService: AuthService,
    public toastr: ToastrService,
    public instiService: InstitucionesService,
    private cifrasEService: CifraEstudianteService,
    private formBuilder: FormBuilder
  ) {
    this.nivelesForm = this.formBuilder.group({
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
  async getInfoUser() {
    const path = 'Usuarios';
    const id = this.uid;
    await this.getDoc<Usuarios>(path, id).subscribe(res => {
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
        this.getDoc<InstitucionesI>(pathI, this.info.idInstitucion).subscribe(resInsti => {
          if (resInsti) {
            this.idInstitucion = resInsti.idInstitucion;
            this.infoInsti = resInsti;

            this.subscription.add(
              this.cifrasEService.GetAllCifrasEstudiantes(this.idInstitucion).subscribe(cifrasE => {
                this.cifrasEstudiantes = [];
                cifrasE.forEach((element: any) => {
                  this.cifrasEstudiantes.push({
                    uid: element.payload.doc.uid,
                    ...element.payload.doc.data()
                  })
                })
                this.dataEstudiantes = this.cifrasEstudiantes;

                this.sumaTotal = this.dataEstudiantes.map(items => items.total).reduce((prev, curr) => parseInt(prev + curr), 0);

                this.sumaMujeres = this.dataEstudiantes.map(items => items.mujeres).reduce((prev, curr) => parseInt(prev + curr), 0);

                this.sumaHombres = this.dataEstudiantes.map(items => items.hombres).reduce((prev, curr) => parseInt(prev + curr), 0);
              })
            )

          }
        });
      }
    });
  }

  getDoc<Usuarios>(path: string, id: any) {
    return this.afs.collection(path).doc<Usuarios>(id).valueChanges()
  }

  onRowEditInit(estudiantesCifras: CifrasEstudiantesI) {
    this.clonedNivel[estudiantesCifras.uid] =
      { ...estudiantesCifras };
  }
  onRowEditSave(cifrasE: CifrasEstudiantesI) {
    const lista = [];
    if (cifrasE.hombres >= 0 && cifrasE.mujeres >= 0 && cifrasE.hombres < 1000 && cifrasE.mujeres < 1000) {
      this.total = parseInt(cifrasE.hombres) + parseInt(cifrasE.mujeres);
      cifrasE.total = this.total;
      this.infoInsti.idInstitucion = this.info.idInstitucion;

      this.afs.collection("CifrasEstudiantes").doc(cifrasE.uid).update({
        hombres: cifrasE.hombres,
        mujeres: cifrasE.mujeres,
        total: cifrasE.total,
      }).then(() => {
        this.toastr.success('Registro actualizado exitosamente', '');
      });
    }
    else {
      this.toastr.error('Error al actualizar el registro', 'ERROR');
      delete this.dataEstudiantes[cifrasE.uid];
    }
  }

  onRowEditCancel(cifrasE: CifrasEstudiantesI, index: number) {
    this.dataEstudiantes[index] = this.clonedNivel[cifrasE.uid];
    delete this.dataEstudiantes[cifrasE.uid];

  }
}
