import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, deleteUser, updatePassword, EmailAuthProvider } from "firebase/auth";

import *as auth from 'firebase/auth'
import { Usuarios } from '../models/user';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import firebase from 'firebase/compat';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; //Guarda datos de usuarios registrados
  uid: any;
  isLogin = false;
  roleAs: any = '';
  roles: any = '';
  constructor(
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public toastr: ToastrService,
    public storage: AngularFireStorage,
    public ngZone: NgZone //servicio para eliminar la advertencia de alcance externo
  ) {

  }

  CrearDoc(data: any, path: string, id: any) {
    const collection = this.afs.collection(path);
    return collection.doc(id).set(data);
  }
  //GENERA ID A LOS DOCUMENTOS
  GetId() {
    return this.afs.createId();
  }
  //leer documentos de una coleccion
  GetCollection<tipo>(path: string) {
    const collection = this.afs.collection<tipo>(path);
    return collection.valueChanges();
  }

  Login(email: string, clave: string) {
    return this.auth
      .signInWithEmailAndPassword(email, clave)
      .then((result) => {
        this.uid = result.user?.uid;
        this.GetDoc<Usuarios>('Usuarios', this.uid).subscribe(user => {
          if (user) {
            this.ngZone.run(() => {
              if (user.roles === 'admin') {
                this.router.navigate(['/inicio']);
              } else {
                this.router.navigate(['/inicio']);
              }
            });
          }
        });
      })
      .catch((error) => {
        this.toastr.error('Datos inválidos, intente otra vez', 'ERROR', {
          positionClass: 'toast-top-right'
        });
      })
  }

  GetDoc<tipo>(path: string, id: string) {
    return this.afs.collection(path).doc<tipo>(id).valueChanges()
  }
 
  ActualizarClave(user: any, newPassword: string) {
    updatePassword(user, newPassword).then(() => {
      console.log('contraseña cambiada');
    }).catch((error) => {
      console.log(error);
    });
  }

  UpdateDoc(path: string, id: string, data: any) {
    return this.afs.collection(path).doc(id).update(data);
  }

  DeleteDoc(path: string, id: string) {
    return this.afs.collection(path).doc(id).delete();
  }

  RegistrarUsuario(datos: Usuarios) {
    return this.auth.createUserWithEmailAndPassword(datos.email, datos.clave)
      .then((result) => {
        this.VerificarUsuario();
      })
      .catch((error) => {
        this.toastr.error('Datos inválidos, intente otra vez', 'ERROR', {
          positionClass: 'toast-top-right'
        });
      });
  }
  VerificarUsuario() {
    return this.auth.currentUser
      .then((u: any) => u.sendEmailVerification());
  }
  //reestablecer clave
  OlvidarClave(claveReset: string) {
    return this.auth
      .sendPasswordResetEmail(claveReset)
      .then(() => {
        window.alert('Correo electrónico de restablecimiento de contraseña enviado, verifique su bandeja de entrada.');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.toastr.error('Datos inválidos, intente otra vez', 'ERROR', {
          positionClass: 'toast-top-right'
        });

      });
  }

  // Devuelve verdadero cuando el usuario inicia sesión y se verifica el correo electrónico
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return (user !== null) ? true : false;
  }
  getRole() {
    this.roleAs = JSON.parse(localStorage.getItem('user')!);
    return this.roleAs.uid;

  }
  //Para verificar el estado de autenticacion del usuario
  StateUser() {
    return this.auth.authState;
  }

  //tener el id del usuario que esta conectado desde cualquier parte 
  async GetUid() {
    const usuario = await this.auth.currentUser;
    if (usuario) {
      return usuario.uid;
    } else {
      return null;
    }
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
  SetUserData(usuario: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `Usuarios/${usuario.uid}`
    );
    const userData: Usuarios = {
      uid: usuario.uid,
      email: usuario.email,
      clave: usuario.clave,
      cedula: usuario.cedula,
      apellidos: usuario.apellidos,
      nombres: usuario.nombres,
      nomProvincia: usuario.nomProvincia,
      emailVerified: usuario.emailVerified,
      roles: usuario.roles,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  async SignOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log(error);
    })
  }
}



