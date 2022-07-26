import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { EditarPerfilComponent } from '../editar-perfil/editar-perfil.component';
import { EmailAuthProvider, getAuth } from "firebase/auth";
import { auth } from 'firebase-admin';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent implements OnInit {
  // email: any = '';
  tabsDirectivo = false;
  tabsRector = false;
  tabsPresidente = false;
  tabsAdmin = false;
  hidePass = false;
  hidePassN = false;
  clave: any = '';
  nuevaClave: any = '';
  uid: any;
  datosUsuario: Usuarios = { email: '', clave: '' };
  passwordForm = new FormGroup({
    passActual: new FormControl('', [Validators.required]),
    passNueva: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])/)])
  });
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router

  ) {
    const auth = getAuth();
    this.authService.StateUser().subscribe(idA => {
      if (idA) {
        this.authService.GetDoc<Usuarios>('Usuarios', idA.uid).subscribe(rolesV => {
          if (rolesV) {
            if (rolesV.roles === 'admin') {
              this.tabsAdmin = true;
            }
            if (rolesV.roles === 'directivo') {
              this.tabsDirectivo = true;
            }
            if (rolesV.roles === 'presidente') {
              this.tabsPresidente = true;
            }
            if (rolesV.roles === 'secretarioRector') {
              this.tabsRector = true;
            }
            
          }
        })
      }
    });

  }

  ngOnInit() {
    this.authService.StateUser().subscribe(usuario => {
      if (usuario) {
        this.getUid();
      }
    })
  }
  async getUid() {
    const uid = await this.authService.GetUid();
    if (uid) {
      this.uid = uid;
      this.getInfoUser();
    } else {
      console.log('no existe uid');
    }
  }
  getInfoUser() {
    const path = 'Usuarios';
    const id = this.uid;
    this.authService.GetDoc<Usuarios>(path, id).subscribe(resUsuario => {
      if (resUsuario) {
        this.datosUsuario = resUsuario;
      }
    });
  }
  Editar(usuario: any) {
    this.EditarDialog();
  }
  EditarDialog(): void {
    this.dialog.open(EditarPerfilComponent,{
      width: '40%'
    });
  }
  CambiarClave() {
     const userAuth = getAuth();
   //const user = auth.currentUser;
    console.log(userAuth);
    this.clave = this.passwordForm.get('passActual')?.value;
    this.nuevaClave = this.passwordForm.get('passNueva')?.value;
    try {
      this.authService.StateUser().subscribe((res: any) => {
        res?.reauthenticateWithCredential(EmailAuthProvider.credential(this.datosUsuario.email, this.clave))
          .then((resultado: any) => {
            this.authService.ActualizarClave(userAuth.currentUser, this.nuevaClave);
            this.toastr.success('Contraseña actualizada con éxito', '');
          })
          .catch((error: any) => {
            this.toastr.error('Contraseña actual incorrecta', 'ERROR');
          })
      })

    } catch (error) {
      this.toastr.error('Datos inválidos', 'ERROR');
    } 
  }

  msgValidatePass() {
    return this.passwordForm.get('passActual')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }

  msgValidateNewPass() {
    return this.passwordForm.get('passNueva')?.hasError('required') ? 'Campo obligatorio' :
      this.passwordForm.get('newPass')?.hasError('pattern') ? 'mínimo 8 caracteres y una letra mayúscula' :
        '';
  }

}
