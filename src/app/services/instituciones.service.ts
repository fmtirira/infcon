import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { InstitucionesI } from '../models/institucion.interface';
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {
  public InsCollection!: AngularFirestoreCollection<InstitucionesI>;
  public Institucion!: Observable<InstitucionesI[]>;

  public instiSelected: InstitucionesI = { idInstitucion: '', codigoAMIE: '', nomInstitucion: '', nomProvincia: '' };
  public instiSelectedBorrar!: InstitucionesI;

  public isEdit!: boolean;
  public isNew!: boolean;
  arrayInstitucion: any[] = [];
  constructor(public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone,
    public storage: AngularFireStorage
  ) {
    this.InsCollection = afs.collection<InstitucionesI>('Instituciones', ref => (ref.orderBy('codigoAMIE', 'asc')));
    this.Institucion = this.InsCollection.valueChanges();
    this.Institucion.subscribe(list => {
      this.arrayInstitucion = list.map(item => {
        return {
          idInstitucion: item.idInstitucion,
          codigoAMIE: item.codigoAMIE,
          nomInstitucion: item.nomInstitucion,
          nomProvincia: item.nomProvincia
        }
      })
    })
  }

  GetDoc<InstitucionesI>(path: string, id: string) {
    return this.afs.collection(path).doc<InstitucionesI>(id).valueChanges()
  }

  DeleteDoc(path: string, id: string) {
    return this.afs.collection(path).doc(id).delete();
  }


  GetAllInstituciones() {
    return this.Institucion = this.InsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as InstitucionesI;
          data.idInstitucion = action.payload.doc.id;
          return data;
        });
      }));
  }
  GetInstituciones():Observable<any>{
    return this.afs.collection('Instituciones', ref => ref.orderBy('nomInstitucion','asc')).snapshotChanges();
  }
  GetAllInstitucionesProvincia(nomProvincia: string): Observable<any> {
    return this.afs.collection('Instituciones', ref => ref.where('nomProvincia', '==', nomProvincia)).snapshotChanges();
  }
  UpdateInstitucion(institucion: InstitucionesI) {
    return this.InsCollection.doc(institucion.idInstitucion).update(institucion);
  }
  DeleteInstitucion(institucion: InstitucionesI) {
    return this.InsCollection.doc(institucion.idInstitucion).delete();
  }
  AddInstitucion(institucion: InstitucionesI) {
    const id = this.afs.createId();
    institucion.idInstitucion = id;
    return this.InsCollection.add(institucion);
  }

  SubirImagen(file: any, path: string, nombre: any): Promise<string> {
    return new Promise(resolve => {
      const filePath = path + '/' + nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(res => {
            const downloadURL = res;
            resolve(downloadURL);
            return;
          });
        })
      )
        .subscribe();
    });
  }
}
