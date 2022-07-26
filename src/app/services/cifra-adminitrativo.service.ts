import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { CifrasAdministrativoI } from '../models/cifrasAdministrativo.interface';
import { InstitucionesI } from '../models/institucion.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CifraAdminitrativoService {
  public CifrasACollection!: AngularFirestoreCollection<CifrasAdministrativoI>;
  public InstiCollection!: AngularFirestoreCollection<InstitucionesI>;
  public CifrasAdministrativos!: Observable<CifrasAdministrativoI[]>;
  public cifraAdministrativoSelected: CifrasAdministrativoI = { idAdmin: '', idInstitucion: '', nomInstitucion: '' };
  public cifraAdministrativoSelectedBorrar!: CifrasAdministrativoI;

  public isEdit!: boolean;
  public isNew!: boolean;
  arrayCifrasAdministrativos!: any[];
  constructor(
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public authService: AuthService,
  ) { }
  GetDoc<CifrasAdministrativoI>(path: string, id: string) {
    return this.afs.collection(path).doc<CifrasAdministrativoI>(id).valueChanges()
  }

  GetAllCifrasAdminsitrativos(idInstitucion: string): Observable<any> {
    return this.afs.collection('CifrasAdministrativos', ref => ref.where('idInstitucion', '==', idInstitucion)).snapshotChanges();
  } 

  GetCifrasAdminsitrativos(id: string) {
    return this.afs.collection('CifrasAdminsitrativos').doc(id).snapshotChanges();
  }

  UpdateCifrasAdminsitrativo(id: string, data: any) {
    return this.afs.collection('CifrasAdminsitrativos').doc(id).update(data);
  }
  DeleteCifrasAdminsitrativos(cifrasAdministrativo: CifrasAdministrativoI) {
    return this.CifrasACollection.doc(cifrasAdministrativo.idAdmin).delete();
  }
  AddCifrasAdminsitrativos(cifrasAdministrativo: CifrasAdministrativoI) {
    const id = this.afs.createId();
    cifrasAdministrativo.idAdmin = id;
    return this.CifrasACollection.add(cifrasAdministrativo);
  }
}
