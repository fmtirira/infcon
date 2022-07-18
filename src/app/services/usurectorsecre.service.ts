import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Usuarios } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsurectorsecreService {
  public directivoSelected!: Usuarios;
  public UsuarioCollection!: AngularFirestoreCollection<Usuarios>;
  public Usuario!: Observable<Usuarios[]>;
  public usuarioSelected: Usuarios = {uid:'',clave:'',email:'', nomProvincia:''};
  public usuarioSelectedBorrar!: Usuarios;

  public isEdit!: boolean;
  public isNew!: boolean;
  
  arrayUsuariosRectorSecre: any[];

  constructor(
    private afs: AngularFirestore,
    public auth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) { 
    this.arrayUsuariosRectorSecre=[];
    this.GetUsuariosRectorSecre();
  }
  GetUsuariosRectorSecre(){
    this.UsuarioCollection = this.afs.collection<Usuarios>('Usuarios', ref => (ref.orderBy('nombres', 'asc') && ref.where('roles','==','secretarioRector')));
    this.Usuario = this.UsuarioCollection.valueChanges();
    this.Usuario.subscribe(list => {
      this.arrayUsuariosRectorSecre = list.map(item => {
        return {
          uid: item.uid,
          email: item.email,
          nomProvincia: item.nomProvincia,
          apellidos: item.apellidos,
          nombres: item.nombres,
          institucion: item.nomInstitucion,
         // clave: item.clave,
          cargo: item.roles          
        }
      })
    })
  }
  GetDoc<tipo>(path: string, id: string) {
    return this.afs.collection(path).doc<tipo>(id).valueChanges()
  }
  GetAllUsuarios(){
    return this.Usuario = this.UsuarioCollection.snapshotChanges()
    .pipe(map(changes =>{
      return changes.map(action =>{
        const data = action.payload.doc.data() as Usuarios;
        data.uid = action.payload.doc.id;
        return data;
      });
    }));
  }
}
