import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, deleteUser } from "firebase/auth";

import *as auth from 'firebase/auth'
import { Usuarios } from '../models/user';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import firebase from 'firebase/compat';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; //Guarda datos de usuarios registrados

  //inyectamos en el constructor angularfireauth - firestore service
  constructor(
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public toastr: ToastrService,
    public ngZone: NgZone //servicio para eliminar la advertencia de alcance externo
  ) {
    /* Guardar datos de usuario en almacenamiento local cuando
   iniciado sesión y configuración nula cuando se cierra la sesión */
    /* this.auth.authState.subscribe((usuario) => {
       if (usuario) {
         this.userData = usuario;
         localStorage.setItem('Usuarios', JSON.stringify(this.userData));
         JSON.parse(localStorage.getItem('Usuarios')!);
       } else {
         localStorage.setItem('Usuarios', 'null');
         JSON.parse(localStorage.getItem('Usuarios')!);
       }
     });*/
  }
  /*
  crear el documento en la colleccion de la base de datos
  recibe 3 argumentos - id - path(ruta) - campos (data)
  me permite crear cualquier tipo de documentos - la funcion es generica
   */
  CrearDoc(data: any, path: string, id: any) {
    //creo una variable - afs es la libreria de firebase
    const collection = this.afs.collection(path);
    //apunto al documento con el id - y set es para obtener la informacion de la data que el usuario envia
    return collection.doc(id).set(data);
  }
  //GENERA ID A LOS DOCUMENTOS
  GetId() {
    return this.afs.createId();
  }
  //leer documentos de una coleccion
  GetCollection<tipo>(path: string) {
    //se envia el path (nombre de la coleccion) 
    const collection = this.afs.collection<tipo>(path);
    return collection.valueChanges(); //se subscribe y es un observable que le permite ver 
    //retorno los cambios para recuperarlos en otra funcion por ejemplo en GetInstitucion()
  }
  //ingresar con email/password

  Login(email: string, clave: string) {
    return this.auth
      .signInWithEmailAndPassword(email, clave)
      .then((result) => {
        this.ngZone.run(() => {
          if(email === 'development.uioweb@gmail.com'){
            this.router.navigate(['/registroD']);
          }else{
            this.router.navigate(['/inicio']);
          }
         
        });
        //this.SetUserData(result.user);
      })
      .catch((error) => {
        this.toastr.error('Datos inválidos, intente otra vez', 'ERROR',{
          positionClass: 'toast-top-right'
        });
      })
  }

  /*se pone como tipo como argumento y será del tipo de la coleccion
   permite tener el documento por id*/
  GetDoc<tipo>(path: string, id: string) {
    return this.afs.collection(path).doc<tipo>(id).valueChanges()
  }

  //se tiene la coleccion, id y el dato
  UpdateDoc(path: string, id: string, data: any) {
    return this.afs.collection(path).doc(id).update(data);
  }

  //para eliminar el documento
  DeleteDoc(path: string, id: string) {
    return this.afs.collection(path).doc(id).delete();
  }

  //Generar pass automatica
  /*ClaveAuto(){
    function getPassword(){
      document.getElementById('pass').value = autoCrear(8);
    }

    function autoCrear(passLongitud: number){
      var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
      var pass ='';
      for(var i=0;i<passLongitud;i++){
        pass+=chars.charAt(Math.floor(Math.random()*chars.length));
      }
      return pass;
    }
  }*/
  /*ClaveAuto() {
    function generarPass(passLongitud: number) {

      var numCaracter = "123456789";
      var mayusCaracter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var minusCaracter = "abcdefghijklmnopqrstuvwxyz";
      var todosCaracter = numCaracter + mayusCaracter + minusCaracter;
      var randomClaveArray = Array(passLongitud);
      randomClaveArray[0] = numCaracter;
      randomClaveArray[1] = mayusCaracter;
      randomClaveArray[2] = minusCaracter;
      randomClaveArray = randomClaveArray.fill(todosCaracter, 3);
      return shuffleArray(randomClaveArray.map(function (x) { return x[Math.floor(Math.random() * x.length)] })).join('');
    }
    function shuffleArray(array: string[]) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
    
      alert(generarPass(8));
  }*/

  //registrar usuarios
  RegistrarUsuario(datos: Usuarios) {
    return this.auth.createUserWithEmailAndPassword(datos.email, datos.clave)
      .then((result) => {
        this.VerificarUsuario();
        //this.SetUserData(result.user);
      })
      .catch((error) => {
        //window.alert(error.message);
        //window.alert('USUARIO YA EXISTE');
        //return null;
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
        this.toastr.error('Datos inválidos, intente otra vez','ERROR',{
          positionClass: 'toast-top-right'
        });
        
      });
  }
  // Devuelve verdadero cuando el usuario inicia sesión y se verifica el correo electrónico
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('usuario')!);
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  //Para verificar el estado de autenticacion del usuario
  StateUser() {
    return this.auth.authState
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
  /* Configuración de datos de usuario al iniciar sesión con nombre de usuario/contraseña,
   regístrese con nombre de usuario/contraseña e inicie sesión con autenticación social
   proveedor en la base de datos de Firestore usando AngularFirestore + AngularFirestoreDocument service */
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
      nomProvincia:usuario.nomProvincia,
      emailVerified: usuario.emailVerified,
      roles: usuario.roles,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  //Cerrar Sesión
  SignOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('usuario');
      this.router.navigate(['/login']);
    });
  }

  //retorna true cuando el usuario se logea y el email es verificado
}



