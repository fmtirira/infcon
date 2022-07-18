import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;//para la clave

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }
  //se guardara los datos aqui
  usuario ={
    email:'',
    clave:''
  }

  /*async Login(){
    try{
      console.log('Credenciales ->', this.usuario);
      const res = await this.authService.Login(this.usuario.email, this.usuario.clave)
      if(res){
        console.log('res ->',res);        
      }
      
    }catch(e:any){
      //alert(e.message);      
    }
  }*/

  btnIngresar(){
    try{
      //recupera el correo y clave del input gracias al ngmodel
     
    }catch(e:any){
      alert(e.message);
    }
  }
}

