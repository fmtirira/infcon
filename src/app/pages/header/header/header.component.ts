import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  login: boolean = false;

  constructor(public authService:AuthService) { 

    this.authService.StateUser().subscribe(res =>{
      if(res){
        console.log('esta logeado esto esta en headercomponent',res.email);
        this.login = true;
      }else{
        console.log('no esta logeado');
        this.login = false;
      }
    })
  }
  ngOnInit(): void {
  }

}
