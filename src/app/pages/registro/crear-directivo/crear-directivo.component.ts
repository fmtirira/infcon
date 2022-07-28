import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as admin from 'firebase-admin';
import { Request, Response } from "express";
import { CreateRequest } from 'firebase-admin/lib/auth/auth-config';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { UsupresidentesService } from 'src/app/services/usupresidentes.service';
import { UsurectorsecreService } from 'src/app/services/usurectorsecre.service';
import { AdministradorService } from 'src/app/services/administrador.service';
@Component({
  selector: 'app-crear-directivo.component',
  templateUrl: './crear-directivo.component.html',
  styleUrls: ['./crear-directivo.component.css']
})
export class CrearDirectivoComponent implements OnInit {

  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  datosDirectivo: Usuarios = {
    uid: '',
    email: '',
    clave: '',
    cedula: '',
    apellidos: '',
    nombres: '',
    nomProvincia: '',
    telefono: '',
    prefijo: '',
    foto: '',
    emailVerified: true,
    roles: 'directivo'
  }
  registrodForm = new FormGroup({
    uid: new FormControl(null),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    email: new FormControl('', (Validators.required, Validators.pattern(this.emailPattern))),
    clave: new FormControl('', (Validators.required, Validators.minLength(8))),
    cedula: new FormControl('', (Validators.required, Validators.minLength(10)))
  });

  constructor(

    private authService: AuthService,
    private presidenteSvc: UsupresidentesService,
    private rectorSvc: UsurectorsecreService,
    private directorSvc: AdministradorService,
    public auth: AngularFireAuth,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<CrearDirectivoComponent>
  ) {
    dialogRef.disableClose = true;
  }
  ngOnInit(): void {
    this.registrodForm = this.formBuilder.group({
      uid: new FormControl(null),
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      cedula: ['', [Validators.required, Validators.minLength(10)]]
    })
  }
  async Salir() {
    this.dialogRef.close();
  }


  async RegistrarD() {
    try {
      if (this.registrodForm.valid) {
        if (this.ExistCedulaD(this.datosDirectivo.cedula) === true) {
          this.toastr.warning('Ya existe usuario con esta cédula', 'DUPLICADOS');
          this.dialogRef.close();
        }
        else {
          const res = await this.RegistrarUsuario(this.datosDirectivo)
            .catch(error => {
              //console.log('error', error);
              this.toastr.error('Email ya se encuentra registrado', 'ERROR', {
                positionClass: 'toast-top-right'
              });
              this.registrodForm.reset();
            })

          if (res) {
            console.log('registrado con éxito');
            const path = 'Usuarios';
            const id = res.user?.uid;
            this.datosDirectivo.uid = id;
            this.datosDirectivo.clave = 'cifrado';
            await this.authService.CrearDoc(this.datosDirectivo, path, id).then(async () => {
              this.toastr.success("Guardado con éxito", '', {
                positionClass: 'toast-top-right'
              });
              await this.Salir();
            });
          }
        }
      }
      else {
        this.toastr.error('Datos inválidos, Intente de nuevo', 'ERROR', {
          positionClass: 'toast-top-right'
        });
        this.registrodForm.reset();
      }


    } catch (error) {
      this.toastr.error('Datos inválidos, Intente de nuevo', 'ERROR', {
        positionClass: 'toast-top-right'
      });
      this.registrodForm.reset();
      //console.log('Error =>', error);
    }
  }
  ExistCedulaD(cedula: any): boolean {
    var exist = false;
    if (cedula) {
      const directivoFiltrado = this.directorSvc.arrayUsuariosDirectivo
        .find(directivoFiltrobyCedula => directivoFiltrobyCedula?.cedula === cedula);
      if (directivoFiltrado) {
        exist = true;
        console.log(' existe ');

      } else {
        console.log(' no existe');
        exist = false;
      }
    } else {
      exist = false;
    }
    return exist;
  }

  RegistrarUsuario(datos: Usuarios) {
    return this.auth.createUserWithEmailAndPassword(datos.email, datos.clave);
  }

  msgValidateApellido() {
    return this.registrodForm.get('apellidos')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateNombre() {
    return this.registrodForm.get('nombres')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }

  msgValidateEmail() {
    return this.registrodForm.get('email')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateClave() {
    return this.registrodForm.get('clave')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }

  msgValidateCedula() {
    return this.registrodForm.get('cedula')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  //Generar pass automatica - no estoy usando
  AutoCrear(passLongitud: number) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
    var pass = '';
    for (var i = 0; i < passLongitud; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  }
}
