import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private afauth: AngularFireAuth,
    private authSvc: AuthService,
    private router: Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afauth.authState.pipe(
      take(1)).pipe(
        map(authState => !! authState)).pipe(tap(conectado =>{
          if(!conectado){
            this.router.navigate(['/iniciarSesion']);
            return true;
          }else{            
            //this.router.navigate(['/inicio']);
            return false;
          }
        }));      
  }
  
}
