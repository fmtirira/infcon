import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Usuarios } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsupresidentesService {
  public directivoSelected!: Usuarios;
  public UsuarioCollection!: AngularFirestoreCollection<Usuarios>;
  public Usuario!: Observable<Usuarios[]>;
  public usuarioSelected: Usuarios = {uid:'',clave:'',email:'', nomProvincia:''};
  public usuarioSelectedBorrar!: Usuarios;

  public isEdit!: boolean;
  public isNew!: boolean;
  
  arrayUsuariosPresidente:any[];

  constructor(
    private afs: AngularFirestore,
    public auth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.arrayUsuariosPresidente =[];
    this.UsuarioCollection = this.afs.collection<Usuarios>('Usuarios', ref => (ref.orderBy('nombres', 'asc') && ref.where('roles','==','presidente')));
    this.Usuario = this.UsuarioCollection.valueChanges();
    this.Usuario.subscribe(list => {
      this.arrayUsuariosPresidente = list.map(item => {
        return {
          uid: item.uid,
          email: item.email,
          nomProvincia: item.nomProvincia,
          apellidos: item.apellidos,
          cedula: item.cedula,
          nombres: item.nombres,
         // clave: item.clave,
          cargo: item.roles          
        }
      })
    })
   }

   GetUsuariosPresidentes(){
    this.UsuarioCollection = this.afs.collection<Usuarios>('Usuarios', ref => (ref.orderBy('nombres', 'asc') && ref.where('roles','==','presidente')));
    this.Usuario = this.UsuarioCollection.valueChanges();
    this.Usuario.subscribe(list => {
      this.arrayUsuariosPresidente = list.map(item => {
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
