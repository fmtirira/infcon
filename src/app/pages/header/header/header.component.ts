import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  login: boolean = false;
  email:any;

  constructor(public authService:AuthService, private router:Router) { 
    this.authService.StateUser().subscribe(res =>{
      if(res){
        
        this.login = true;
        this.email = res.email;
      }else{
        //console.log('no esta logeado');
        this.login = false;
      }
    })
  }
  ngOnInit(): void {
  }
  Perfil(){
    this.router.navigate(['/usuario-perfil']);
  }

}
