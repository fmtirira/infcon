import { Component, OnInit } from '@angular/core';
import { Roles, Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  perfil!: 'admin' | 'directivo' | 'presidente' | 'secretarioRector'|undefined;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  //datos del usuario
  GetDatosUser(uid:string){
    const path = 'Usuarios';
    const id = uid;
    this.authService.GetDoc<Usuarios>(path,id).subscribe(res =>{
      console.log('datos ->',res);
      if(res){
        this.perfil = res.roles
      }
    })

  }
}
