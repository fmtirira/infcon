import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CifrasAdministrativoI } from 'src/app/models/cifrasAdministrativo.interface';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { InstitucionesService } from 'src/app/services/instituciones.service';

@Component({
  selector: 'app-cifras-administrativos',
  templateUrl: './cifras-administrativos.component.html',
  styleUrls: ['./cifras-administrativos.component.css']
})
export class CifrasAdministrativosComponent implements OnInit {
  administrativoForm: FormGroup;

  public InstitucionCollection!: AngularFirestoreCollection<InstitucionesI>;
  public InstitucionDocument!: AngularFirestoreDocument<InstitucionesI>;
  public InstitucionInfo!: Observable<any[]>;
  public myNivelOf$!: Observable<any>;
  public institucionElements: [] = []; //guarda la data de todas las instituciones
  uid: any = ''; //uid del Usuario
  info!: Usuarios; //me permite traer la info a la vista
  infoInstitucion: InstitucionesI[] = [];
  infoInsti!: InstitucionesI;
  infoAdmin!:any;
  dataNivel: CifrasAdministrativoI[] = [];
  adminTotal!: number;

  clonedNivel: { [s: string]: CifrasAdministrativoI; } = {};

  constructor(
    public afs: AngularFirestore,
    public authService: AuthService,
    public toastr: ToastrService,
    public instiService: InstitucionesService,
    private formBuilder: FormBuilder
  ) { 
    this.administrativoForm = this.formBuilder.group({
      idAdmin: (null),
      idInstitucion:(null),
      adminHombres: ['', Validators.required],
      adminMujeres: ['', Validators.required],
      adminTotal: (null)
    });
  }

  ngOnInit() {
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
      
       
        const idInsti =this.info.idInstitucion;
        console.log('this.info.idInstitucion',idInsti);
        this.getDoc<InstitucionesI>('Instituciones', idInsti).subscribe(resCifras => {
          console.log('rescifras',resCifras);

          if (resCifras) {
            this.infoInsti = resCifras;
            this.infoAdmin = resCifras?.cifrasAdministrativos;
            this.dataNivel = this.infoAdmin;
            console.log('info admin',this.infoAdmin);           
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

  onRowEditInit(adminCifras: CifrasAdministrativoI) {
    this.clonedNivel[adminCifras.idAdmin] =
      { ...adminCifras };
    console.log('niveles 1', adminCifras);
  }

  onRowEditSave(cifrasA: CifrasAdministrativoI) {
    //delete this.clonedProducts[product.id];

    const lista = [];
    if(cifrasA.adminHombres>=0 && cifrasA.adminMujeres>=0 && cifrasA.adminHombres<1000 && cifrasA.adminMujeres<1000){
      this.adminTotal = parseInt(cifrasA.adminHombres) + parseInt(cifrasA.adminMujeres);
      cifrasA.adminTotal = this.adminTotal;
    console.log('id Insti', this.info.idInstitucion);
    this.infoInsti.idInstitucion = this.info.idInstitucion;

    /*  let item = this.infoInsti.niveles?.find(item => item.id === cifrasA.idAdmin);
    if (item) {
      item.hombres = nivelesn.hombres,
      console.log('item ', item.hombres);
    } */

    console.log('niveles', this.infoInsti); 
    
      this.afs.collection("Instituciones").doc(this.infoInsti.idInstitucion).update({

        //this.infoInsti.niveles = lista;
        cifrasAdministrativos: this.infoInsti.cifrasAdministrativos,
      }).then(() => {

        this.toastr.success('Registro actualizado exitosamente', '');
      });
   

    }
    else{
      this.toastr.error('Error al actualizar el registro', 'ERROR');
      delete this.dataNivel[cifrasA.idAdmin];
    }
  
 
    console.log('cifras 2 Administrativos', cifrasA);
    console.log('object niveles', this.dataNivel);

  }

  onRowEditCancel(cifrasA: CifrasAdministrativoI, index: number) {
    this.dataNivel[index] = this.clonedNivel[cifrasA.idAdmin];
    delete this.dataNivel[cifrasA.idAdmin];
    console.log('cifras 3', cifrasA);
  }

}
