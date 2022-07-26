import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CifrasDocentesI } from '../models/cifrasDocentes.interface';
import { InstitucionesI } from '../models/institucion.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CifraDocenteService {
  public CifrasDCollection!: AngularFirestoreCollection<CifrasDocentesI>;
  public InstiCollection!: AngularFirestoreCollection<InstitucionesI>;
  public CifrasDocentes!: Observable<CifrasDocentesI[]>;
  public cifraDocenteSelected: CifrasDocentesI = { id:'',uid: '', idInstitucion: '', nomInstitucion: ''};
  public cifraDocenteSelectedBorrar!: CifrasDocentesI;

  public isEdit!: boolean;
  public isNew!: boolean;
  arrayCifrasDocentes!: any[];
  constructor(
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone,
    public authService: AuthService,
  ) { }
  GetDoc<CifrasDocentesI>(path: string, id: string) {
    return this.afs.collection(path).doc<CifrasDocentesI>(id).valueChanges()
  }

  GetAllCifrasDocentes(idInstitucion: string): Observable<any> {
    return this.afs.collection('CifrasDocentes', ref => ref.where('idInstitucion', '==', idInstitucion)).snapshotChanges();
  }

  GetCifrasDocentes(id: string) {
    return this.afs.collection('CifrasDocentes').doc(id).snapshotChanges();
  }

  UpdateCifrasEstudiante(id: string, data: any) {
    return this.afs.collection('CifrasDocentes').doc(id).update(data);
  }
  DeleteCifrasEstudiantes(cifrasDocente: CifrasDocentesI) {
    return this.CifrasDCollection.doc(cifrasDocente.uid).delete();
  }
  AddCifrasEstudiantes(cifrasEstudiante: CifrasDocentesI) {
    const id = this.afs.createId();
    cifrasEstudiante.uid = id;
    return this.CifrasDCollection.add(cifrasEstudiante);
  }
}
