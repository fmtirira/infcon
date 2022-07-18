import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RepresentantesI } from '../models/representante.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RepresentantesService {
  public RepreCollection!: AngularFirestoreCollection<RepresentantesI>;
  public Representante!: Observable<RepresentantesI[]>;
  public representanteSelected: RepresentantesI = { uid: '', idInstitucion: '', nomInstitucion: '', email: '' };
  public repreSelectedBorrar!: RepresentantesI;
  public isEdit!: boolean;
  public isNew!: boolean;
  arrayRepresentante!: any[];

  constructor(
    public auth: AngularFireAuth,
    public authService: AuthService,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.arrayRepresentante = [];

    this.RepreCollection = this.afs.collection<RepresentantesI>('Representantes', ref => (ref.orderBy('nombres', 'asc')));
    this.Representante = this.RepreCollection.valueChanges();
    this.Representante.subscribe(list => {
      this.arrayRepresentante = list.map(item => {
        return {
          id: item.idInstitucion,
          uid: item.uid,
          nombre: item.nomInstitucion,
          email: item.email
        }
      });
    });
  }
  GetDoc<RepresentantesI>(path: string, id: string) {
    return this.afs.collection(path).doc<RepresentantesI>(id).valueChanges()
  }
  //para eliminar el documento
  DeleteDoc(path: string, id: string) {
    return this.afs.collection(path).doc(id).delete();
  }

  GetAllRepresentantes() {

    return this.Representante = this.RepreCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as RepresentantesI;
          data.uid = action.payload.doc.id;
          return data;
        });
      }));
  }
  //traer por id de insitucion
  GetRepresentantes(idInstitucion: string): Observable<any> {
    return this.afs.collection('Representantes', ref => ref.where('idInstitucion', '==', idInstitucion).orderBy('nombres', 'asc')).snapshotChanges();
  }
  UpdateRepresentante(representante: RepresentantesI) {
    return this.RepreCollection.doc(representante.uid).update(representante);
  }
  DeleteRepresentante(representante: RepresentantesI) {
    return this.RepreCollection.doc(representante.uid).delete();
  }
  AddRepresentante(representante: RepresentantesI) {
    const id = this.afs.createId();
    representante.uid = id;
    return this.RepreCollection.add(representante);
  }
}
