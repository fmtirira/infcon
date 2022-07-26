import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CifrasDocentesI } from '../models/cifrasDocentes.interface';

@Injectable({
  providedIn: 'root'
})
export class CifrasDocentesService {
  public CifrasDocentesCollection!: AngularFirestoreCollection<CifrasDocentesI>;
  public CifrasDocentes!: Observable<CifrasDocentesI[]>; 

  public cifrasDocentesSelected: CifrasDocentesI ={uid:'',id:'',idInstitucion: '',nomInstitucion: '', nomProvincia:''};
  public cifrasDocentesSelectedBorrar!: CifrasDocentesI;

  public isEdit!: boolean;
  public isNew!:boolean;
  arrayCifrasEstudiantes: any[];
  constructor(public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone
    ) { 
      this.arrayCifrasEstudiantes = [];
      this.CifrasDocentesCollection = afs.collection<CifrasDocentesI>('CifrasDocentes', ref => (ref.orderBy('idInstitucion','asc')));
      this.CifrasDocentes = this.CifrasDocentesCollection.valueChanges();
      this.CifrasDocentes.subscribe(list =>{
        this.arrayCifrasEstudiantes = list.map(item =>{
          return {
            uid:item.uid,
            id: item.id,
            idInstitucion: item.idInstitucion,            
            nomInstitucion: item.nomInstitucion,
            nomProvincia: item.nomProvincia
          }
        })
      })
    }
   /*se pone como tipo como argumento y será del tipo de la coleccion
   permite tener el documento por id*/
   GetDoc<CifrasDocentesI>(path: string, id: any) {
    return this.afs.collection(path).doc<CifrasDocentesI>(id).valueChanges()
  }
  //para eliminar el documento
  DeleteDoc(path: string, id: any) {
    return this.afs.collection(path).doc(id).delete();
  }
  //traer todas las instituciones
  GetAllCifrasDocentes(){
    return this.CifrasDocentes = this.CifrasDocentesCollection.snapshotChanges()
    .pipe(map(changes =>{
      return changes.map(action =>{
        const data = action.payload.doc.data() as CifrasDocentesI;
        data.uid = action.payload.doc.id;
        return data;
      });
    }));
  }

  GetDocentesProvincia(nomProvincia: string): Observable<any> {
    return this.afs.collection('CifrasDocentes', ref => ref.where('nomProvincia', '==', nomProvincia)).snapshotChanges();
  }

  UpdateCifrasDocentes(cifrasDocentes: CifrasDocentesI){
    return this.CifrasDocentesCollection.doc(cifrasDocentes.uid).update(cifrasDocentes);
  }
  DeleteCifrasDocentes(cifrasDocentes: CifrasDocentesI){
    return this.CifrasDocentesCollection.doc(cifrasDocentes.uid).delete();
  }
  AddCifrasDocentes(cifrasDocentes: CifrasDocentesI){
    const id = this.afs.createId();
    cifrasDocentes.uid = id;
    return this.CifrasDocentesCollection.add(cifrasDocentes);
  }
}
