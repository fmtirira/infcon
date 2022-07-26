import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { CifrasAdministrativoI } from '../models/cifrasAdministrativo.interface';

@Injectable({
  providedIn: 'root'
})
export class CifrasAdministrativosService {
  public CifrasAdministrativosCollection!: AngularFirestoreCollection<CifrasAdministrativoI>;
  public CifrasAdministrativos!: Observable<CifrasAdministrativoI[]>;

  public cifrasAdministrativosSelected: CifrasAdministrativoI = { idAdmin: '', idInstitucion: '', nomInstitucion: '', nomProvincia: '' };
  public cifrasAdministrativosSelectedBorrar!: CifrasAdministrativoI;

  public isEdit!: boolean;
  public isNew!: boolean;
  arrayCifrasAdministrativos: any[];
  constructor(public auth: AngularFireAuth,
    public afs: AngularFirestore
  ) {
    this.arrayCifrasAdministrativos = [];
    this.CifrasAdministrativosCollection = afs.collection<CifrasAdministrativoI>('CifrasAdministrativos', ref => (ref.orderBy('idAdmin', 'asc')));
    this.CifrasAdministrativos = this.CifrasAdministrativosCollection.valueChanges();
    this.CifrasAdministrativos.subscribe(list => {
      this.arrayCifrasAdministrativos = list.map(item => {
        return {
          idAdmin: item.idAdmin,
          idInstitucion: item.idInstitucion,
          nomInstitucion: item.nomInstitucion,
          nomProvincia: item.nomProvincia
        }
      })
    })
  }
  GetAdministrativosProvincia(nomProvincia: string): Observable<any> {
    return this.afs.collection('CifrasAdministrativos', ref => ref.where('nomProvincia', '==', nomProvincia)).snapshotChanges();
  }
  /*se pone como tipo como argumento y será del tipo de la coleccion
  permite tener el documento por id*/
  GetDoc<CifrasAdministrativoI>(path: string, id: any) {
    return this.afs.collection(path).doc<CifrasAdministrativoI>(id).valueChanges()
  }
  //para eliminar el documento
  DeleteDoc(path: string, id: any) {
    return this.afs.collection(path).doc(id).delete();
  }

  GetAllCifrasAdministrativos() {
    return this.CifrasAdministrativos = this.CifrasAdministrativosCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as CifrasAdministrativoI;
          data.idAdmin = action.payload.doc.id;
          return data;
        });
      }));
  }

  UpdateCifrasAdministrativos(cifrasAdministrativo: CifrasAdministrativoI) {
    return this.CifrasAdministrativosCollection.doc(cifrasAdministrativo.idAdmin).update(cifrasAdministrativo);
  }
  DeleteCifrasAdministrativos(cifrasAdministrativo: CifrasAdministrativoI) {
    return this.CifrasAdministrativosCollection.doc(cifrasAdministrativo.idAdmin).delete();
  }
  AddCifrasAdministrativos(cifrasAdministrativo: CifrasAdministrativoI) {
    const id = this.afs.createId();
    cifrasAdministrativo.idAdmin = id;
    return this.CifrasAdministrativosCollection.add(cifrasAdministrativo);
  }
}
