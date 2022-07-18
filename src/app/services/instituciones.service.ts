import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { InstitucionesI } from '../models/institucion.interface';

@Injectable({ 
  providedIn: 'root'
})
export class InstitucionesService {  
  public InsCollection!: AngularFirestoreCollection<InstitucionesI>;
  public Institucion!: Observable<InstitucionesI[]>; 

  public instiSelected: InstitucionesI ={idInstitucion: '',codigoAMIE: '',nomInstitucion: '', nomProvincia:''};
  public instiSelectedBorrar!: InstitucionesI;

  public isEdit!: boolean;
  public isNew!:boolean;
  arrayInstitucion: any[];
  constructor(public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone
    ) { 
      this.arrayInstitucion = [];
      this.InsCollection = afs.collection<InstitucionesI>('Instituciones', ref => (ref.orderBy('codigoAMIE','asc')));
      this.Institucion = this.InsCollection.valueChanges();
      this.Institucion.subscribe(list =>{
        this.arrayInstitucion = list.map(item =>{
          return {
            id: item.idInstitucion,
            cod: item.codigoAMIE,
            nombre: item.nomInstitucion,
            instiProvincia: item.nomProvincia
          }
        })
      })
    }
   /*se pone como tipo como argumento y será del tipo de la coleccion
   permite tener el documento por id*/
   GetDoc<InstitucionesI>(path: string, id: string) {
    return this.afs.collection(path).doc<InstitucionesI>(id).valueChanges()
  }
  //para eliminar el documento
  DeleteDoc(path: string, id: string) {
    return this.afs.collection(path).doc(id).delete();
  }

  //traer todas las instituciones
  GetAllInstituciones(){
    return this.Institucion = this.InsCollection.snapshotChanges()
    .pipe(map(changes =>{
      return changes.map(action =>{
        const data = action.payload.doc.data() as InstitucionesI;
        data.idInstitucion = action.payload.doc.id;
        return data;
      });
    }));
  }
  UpdateInstitucion(institucion: InstitucionesI){
    return this.InsCollection.doc(institucion.idInstitucion).update(institucion);
  }
  DeleteInstitucion(institucion: InstitucionesI){
    return this.InsCollection.doc(institucion.idInstitucion).delete();
  }
  AddInstitucion(institucion: InstitucionesI){
    const id = this.afs.createId();
    institucion.idInstitucion = id;
    return this.InsCollection.add(institucion);
  }
}
