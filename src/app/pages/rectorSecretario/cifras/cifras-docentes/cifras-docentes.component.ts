import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { InstitucionesI, NivelDocentes } from 'src/app/models/institucion.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { InstitucionesService } from 'src/app/services/instituciones.service';

@Component({
  selector: 'app-cifras-docentes',
  templateUrl: './cifras-docentes.component.html',
  styleUrls: ['./cifras-docentes.component.css']
})
export class CifrasDocentesComponent implements OnInit {
  public InstitucionCollection!: AngularFirestoreCollection<InstitucionesI>;
  public InstitucionDocument!: AngularFirestoreDocument<InstitucionesI>;
  public InstitucionInfo!: Observable<any[]>;

  uid: any = ''; //uid del Usuario
  info!: Usuarios; //me permite traer la info a la vista
  infoInstitucion: InstitucionesI[] = [];
  infoInsti!: InstitucionesI;
  //data!: InstitucionesI;
  infoNi!: any; //me permite guardar los object de los niveles
  mujeres = 0;
  hombres = 0;
  total!: number;
  sumaTotal:any;
  sumaMujeres:any;
  sumaHombres: any;
  datosNivelesInsti: any[] = [];

  dataDocente: NivelDocentes[] = [];

  //me permitira poder actualizar la data de instituciones
  clonedNivel: { [s: string]: NivelDocentes; } = {};
  //form
  docentesForm: FormGroup; 

  constructor(
    public afs: AngularFirestore,
    public authService: AuthService,
    public toastr: ToastrService,
    public instiService: InstitucionesService,
    private formBuilder: FormBuilder
  ) { 
    this.docentesForm = this.formBuilder.group({
      idNivel: (null),
      nomNivelEducacion: ['', Validators.required],
      docenHombres: ['', Validators.required],
      docenMujeres: ['', Validators.required],
      docenTotal: (null)
    });
  }

  ngOnInit(){
    this.authService.StateUser().subscribe(res => {

      this.getUid();
    });
  }
  async getUid() {
    const uid = await this.authService.GetUid();
    if (uid) {
      this.uid = uid;
      console.log('uid ->', this.uid);
      this.getInfoUser();
    } else {
      console.log('no existe uid');
    }
  }

  getInfoUser() {
    const path = 'Usuarios';
    const id = this.uid;
    this.getDoc<Usuarios>(path, id).subscribe(res => {
      if (res) {
        this.info = res;
        const pathI = 'Instituciones';
        this.InstitucionCollection = this.afs.collection(pathI);
        this.getDoc<InstitucionesI>(pathI, this.info.idInstitucion).subscribe(resInsti => {
          if (resInsti) {
            this.infoInsti = resInsti;
            this.infoNi = resInsti?.cifrasDocentes;
            this.dataDocente = this.infoNi;
            console.log(this.dataDocente);
             this.sumaTotal= this.dataDocente.map(items => items.docenTotal).reduce((prev, curr) => prev+curr,0);
            console.log('Total suma ',this.sumaTotal); 
            this.sumaMujeres= this.dataDocente.map(items => items.docenMujeres).reduce((prev, curr) => prev+curr,0);
            console.log('Total suma ',this.sumaMujeres); 
            this.sumaHombres= this.dataDocente.map(items => items.docenHombres).reduce((prev, curr) => prev+curr,0);
            console.log('Total suma ',this.sumaHombres); 
          }
        });
      }
    });
  }


  getInstitucion(id: any): Observable<any> {
    return this.afs.collection('Instituciones').doc(id).snapshotChanges();
  }
  getDoc<Usuarios>(path: string, id: any) {
    return this.afs.collection(path).doc<Usuarios>(id).valueChanges()
  }

  onRowEditInit(niveles: NivelDocentes) {
    this.clonedNivel[niveles.idNivel] =
      { ...niveles };
    console.log('niveles 1', niveles);
  }

  onRowEditSave(nivelesn: NivelDocentes) {  
    if(nivelesn.docenHombres>0 && nivelesn.docenMujeres>0 && nivelesn.docenHombres<1000 && nivelesn.docenMujeres<1000){
      this.total = parseInt(nivelesn.docenHombres) + parseInt(nivelesn.docenMujeres);
    nivelesn.docenTotal = this.total;
    console.log('id Insti', this.info.idInstitucion);
    this.infoInsti.idInstitucion = this.info.idInstitucion;

    let item = this.infoInsti.cifrasDocentes?.find(item => item.idNivel === nivelesn.idNivel);
    if (item) {
      item.docenHombres = nivelesn.docenHombres,
      console.log('item ', item.docenHombres);
    }    

    console.log('niveles', this.infoInsti);
    
      this.afs.collection("Instituciones").doc(this.infoInsti.idInstitucion).update({

        //this.infoInsti.niveles = lista;
        cifrasDocentes: this.infoInsti.cifrasDocentes,
      }).then(() => {

        this.toastr.success('Registro actualizado exitosamente', '');
      });
   

    }
    else{
      this.toastr.error('Error al actualizar el registro', 'ERROR');
      delete this.dataDocente[nivelesn.idNivel];
    } 
    console.log('niveles 2', nivelesn);
    console.log('object niveles', this.dataDocente);

  }

  onRowEditCancel(niveles: NivelDocentes, index: number) {
    this.dataDocente[index] = this.clonedNivel[niveles.idNivel];
    delete this.dataDocente[niveles.idNivel];
    console.log('niveles 3', niveles);
  }

  //Documento de la institucion
  updateDoc(data: any, id: any) {
    const collection = this.afs.collection('Instituciones');
    return collection.doc(id).update(data);
  }

}
