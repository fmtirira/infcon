import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CifrasEstudiantesI } from '../models/cifrasEstudiantes.interface';

@Injectable({
  providedIn: 'root'
})
export class CifrasEstudiantesService {
  public CifrasEstudiantesCollection!: AngularFirestoreCollection<CifrasEstudiantesI>;
  public CifrasEstudiantes!: Observable<CifrasEstudiantesI[]>; 

  public cifrasEstudiantesSelected: CifrasEstudiantesI ={uid:'',idInstitucion: '',nomInstitucion: '', nomProvincia:''};
  public cifrasEstudiantesSelectedBorrar!: CifrasEstudiantesI;

  public isEdit!: boolean;
  public isNew!:boolean;
  arrayCifrasEstudiantes: any[];
  constructor(public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone
    ) { 
      this.arrayCifrasEstudiantes = [];
      this.CifrasEstudiantesCollection = afs.collection<CifrasEstudiantesI>('CifrasEstudiantes', ref => (ref.orderBy('idInstitucion','asc')));
      this.CifrasEstudiantes = this.CifrasEstudiantesCollection.valueChanges();
      this.CifrasEstudiantes.subscribe(list =>{
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
   GetDoc<CifrasEstudiantesI>(path: string, id: any) {
    return this.afs.collection(path).doc<CifrasEstudiantesI>(id).valueChanges()
  }
  //para eliminar el documento
  DeleteDoc(path: string, id: any) {
    return this.afs.collection(path).doc(id).delete();
  }

  //traer todas las instituciones
  GetAllCifrasEstudiantes(){
    return this.CifrasEstudiantes = this.CifrasEstudiantesCollection.snapshotChanges()
    .pipe(map(changes =>{
      return changes.map(action =>{
        const data = action.payload.doc.data() as CifrasEstudiantesI;
        data.uid = action.payload.doc.id;
        return data;
      });
    }));
  }
  GetEstudiantesProvincia(nomProvincia: string): Observable<any> {
    return this.afs.collection('CifrasEstudiantes', ref => ref.where('nomProvincia', '==', nomProvincia)).snapshotChanges();
  }
  UpdateCifrasEstudiantes(cifrasEstudiantes: CifrasEstudiantesI){
    return this.CifrasEstudiantesCollection.doc(cifrasEstudiantes.uid).update(cifrasEstudiantes);
  }
  DeleteCifrasEstudiantes(cifrasEstudiantes: CifrasEstudiantesI){
    return this.CifrasEstudiantesCollection.doc(cifrasEstudiantes.uid).delete();
  }
  AddCifrasEstudiantes(cifrasEstudiantes: CifrasEstudiantesI){
    const id = this.afs.createId();
    cifrasEstudiantes.uid = id;
    return this.CifrasEstudiantesCollection.add(cifrasEstudiantes);
  }
}
