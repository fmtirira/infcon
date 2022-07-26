import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;//para la clave
  login= false;

  constructor(public authService:AuthService,private router: Router) {
    this.authService.StateUser().subscribe(res =>{
      if(res){        
        this.login = true;
        this.router.navigate(['/inicio']);
      }else{
        //console.log('no esta logeado');
        this.login = false;
      }
    })
   }

  ngOnInit(): void {
  }
  //se guardara los datos aqui
  usuario ={
    email:'', 
    clave:''
  }


  btnIngresar(){
    try{
      
    }catch(e:any){
      alert(e.message);
    }
  }
}

