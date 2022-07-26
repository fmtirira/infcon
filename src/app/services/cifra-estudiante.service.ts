import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { CifrasEstudiantesI } from '../models/cifrasEstudiantes.interface';
import { InstitucionesI } from '../models/institucion.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CifraEstudianteService {
  public CifrasECollection!: AngularFirestoreCollection<CifrasEstudiantesI>;
  public InstiCollection!: AngularFirestoreCollection<InstitucionesI>;
  public CifrasEstudiantes!: Observable<CifrasEstudiantesI[]>;
  public cifraEstudianteSelected: CifrasEstudiantesI = { uid: '', idInstitucion: '', nomInstitucion: '' };
  public cifraEstudianteSelectedBorrar!: CifrasEstudiantesI;

  public isEdit!: boolean;
  public isNew!: boolean;
  arrayCifrasEstudiantes!: any[];
  constructor(
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public authService: AuthService,
  ) { }
  GetDoc<CifrasEstudiantesI>(path: string, id: string) {
    return this.afs.collection(path).doc<CifrasEstudiantesI>(id).valueChanges()
  }

  GetAllCifrasEstudiantes(idInstitucion: string): Observable<any> {
    return this.afs.collection('CifrasEstudiantes', ref => ref.where('idInstitucion', '==', idInstitucion)).snapshotChanges();
  }

  GetCifrasEstudiantes(id: string) {
    return this.afs.collection('CifrasEstudiantes').doc(id).snapshotChanges();
  }

  UpdateCifrasEstudiante(id: string, data: any) {
    return this.afs.collection('CifrasEstudiantes').doc(id).update(data);
  }
  DeleteCifrasEstudiantes(cifrasEstudiante: CifrasEstudiantesI) {
    return this.CifrasECollection.doc(cifrasEstudiante.uid).delete();
  }
  AddCifrasEstudiantes(cifrasEstudiante: CifrasEstudiantesI) {
    const id = this.afs.createId();
    cifrasEstudiante.uid = id;
    return this.CifrasECollection.add(cifrasEstudiante);
  }
}
