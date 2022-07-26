import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuarios } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanActivate {
  resultado!: Boolean;
  constructor(
    private afauth: AngularFireAuth,
    private authSvc: AuthService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(route, url);
  }
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authSvc.isLoggedIn) {
      const userRole = this.authSvc.getRole();
      //console.log('¿userRole', userRole);
      this.authSvc.GetDoc<Usuarios>('Usuarios', userRole).subscribe((verificar: any) => {
        //console.log(verificar?.roles);
        if (verificar?.roles === 'admin') {
          this.resultado = true;
          if (this.resultado === true) {
            return verificar.roles;
          }
          else {
            this.resultado = false;
            return verificar.roles;
          }
        }
      });

      return true;
    } else {
      return true;
    }

    //this.router.navigate(['/iniciarSesion']);

  }

}
