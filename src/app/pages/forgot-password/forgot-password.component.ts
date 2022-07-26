import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }
  ResetearClave(email: string) {

    if (email === 'development.uioweb@gmail.com') {
      this.toastr.error('Usuario administrador no tiene acceso a cambio de clave, mantenga contacto con usuario del Hosting', '');
    }
    else {
      this.authService.OlvidarClave(email);
    }

  }
}
