import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { InstitucionesI } from '../models/institucion.interface';
import { RepresentantesI } from '../models/representante.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {
  public RepreCollection!: AngularFirestoreCollection<RepresentantesI>;
  public InstiCollection!: AngularFirestoreCollection<InstitucionesI>;
  public Representante!: Observable<RepresentantesI[]>;
  public representanteSelected: RepresentantesI = { uid: '', idInstitucion: '', nomInstitucion: '', email: '' };
  public repreSelectedBorrar!: RepresentantesI;

  public isEdit!: boolean;
  public isNew!: boolean;
  arrayRepresentante!: any[];

  constructor(
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone,
    public authService: AuthService,
  ) {
    /* this.arrayRepresentante = [];
    this.RepreCollection = afs.collection<RepresentantesI>('Representantes', ref => (ref.orderBy('nomInstitucion', 'asc')));
    this.Representante = this.RepreCollection.valueChanges();
    this.Representante.subscribe(list =>{
      this.arrayRepresentante = list.map(item =>{
        return {
          id: item.idInstitucion,
          uid: item.uid,
          nombre: item.nomInstitucion,
          email: item.email
        }
      });
    });   */
  }

  GetDoc<RepresentantesI>(path: string, id: string) {
    return this.afs.collection(path).doc<RepresentantesI>(id).valueChanges()
  }

  GetAllRepresentantes(idInstitucion: string): Observable<any> {
    return this.afs.collection('Representantes', ref => ref.where('idInstitucion', '==', idInstitucion)).snapshotChanges();
  }

  GetRepresentante(id: string) {
    return this.afs.collection('Representantes').doc(id).snapshotChanges();
  }
  /* GetAllRepresentantes(){
    return this.Representante = this.RepreCollection.snapshotChanges()
    .pipe(map(changes =>{
      return changes.map(action =>{
        const data = action.payload.doc.data() as RepresentantesI;
        data.uid = action.payload.doc.id;
        return data;
      });
    }));
  } */
  UpdateRepresentante(id: string, data: any) {
    return this.afs.collection('Representantes').doc(id).update(data);
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
