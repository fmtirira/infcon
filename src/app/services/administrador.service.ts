import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { deleteUser } from "firebase/auth";
import { map, Observable } from 'rxjs';
import { Usuarios } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AdministradorService { 
  public directivoSelected!: Usuarios;
  public UsuarioCollection!: AngularFirestoreCollection<Usuarios>;
  public Usuario!: Observable<Usuarios[]>;
  public usuarioSelected: Usuarios = {uid:'',clave:'',email:'', nomProvincia:''};
  public usuarioSelectedBorrar!: Usuarios;

  public isEdit!: boolean;
  public isNew!: boolean;
  arrayUsuariosDirectivo:any[] = [];

  constructor(
    private afs: AngularFirestore,
    public auth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
   
    this.UsuarioCollection = this.afs.collection<Usuarios>('Usuarios', ref => (ref.orderBy('nombres', 'asc') && ref.where('roles','==','directivo')));
    this.Usuario = this.UsuarioCollection.valueChanges();
    this.Usuario.subscribe(list => {
      this.arrayUsuariosDirectivo = list.map(item => {
        return {
          uid: item.uid,
          email: item.email,
          nomProvincia: item.nomProvincia,
          apellidos: item.apellidos,
          nombres: item.nombres,
          cedula: item.cedula,
         // clave: item.clave,
          roles: item.roles          
        }
      })
    })

  }

  GetUsuariosDirectivos(){ 
    this.UsuarioCollection = this.afs.collection<Usuarios>('Usuarios', ref => (ref.orderBy('nombres', 'asc') && ref.where('roles','==','directivo')));
    this.Usuario = this.UsuarioCollection.valueChanges();
    this.Usuario.subscribe(list => {
      this.arrayUsuariosDirectivo = list.map(item => {
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
 
  UpdateUsuario(usuario: Usuarios){
    return this.UsuarioCollection.doc(usuario.uid).update(usuario);
  }
  DeleteUsuario(usuario: Usuarios){
    return this.UsuarioCollection.doc(usuario.uid).delete();
  }
  AddUsuario(usuario: Usuarios){
    const id = this.afs.createId();
    usuario.uid = id;
    return this.UsuarioCollection.add(usuario);
  }
  
  //eliminar documento
  EliminarUsuario(usuario:Usuarios){  
    deleteUser;
      return this.afs.collection('Usuarios')
      .doc(usuario.uid)
      .delete()    
  }


  //actualizar un director
  ActualizarDirectivo(usuario: Usuarios) {
    return this.afs.collection('Usuarios')
      .doc(usuario.uid)
      .update({
        usuario
      });
  }
}
