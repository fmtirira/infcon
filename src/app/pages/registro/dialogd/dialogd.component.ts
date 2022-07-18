import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialogd',
  templateUrl: './dialogd.component.html',
  styleUrls: ['./dialogd.component.css']
})
export class DialogdComponent implements OnInit {

  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  datosDirectivo: Usuarios = {
    uid: '',
    email: '',
    clave: '',
    cedula: '',
    apellidos: '',
    nombres: '',
    nomProvincia: '',
    emailVerified: true,
    /*roles:{
      directivo: true
    }*/
    roles: 'directivo'
  }
  registrodForm = new FormGroup({
    uid: new FormControl(null),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    email: new FormControl('', (Validators.required, Validators.pattern(this.emailPattern))),
    clave: new FormControl('', (Validators.required, Validators.minLength(6))),
    cedula: new FormControl('', (Validators.required, Validators.minLength(10)))
  });

  constructor(
    private authService: AuthService,
    public auth: AngularFireAuth,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<DialogdComponent>
  ) {
    dialogRef.disableClose = true;
  }
  ngOnInit(): void {
    this.registrodForm = this.formBuilder.group({
      uid: new FormControl(null),
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      cedula: ['', [Validators.required, Validators.minLength(9)]]
    })
  }
  Salir(): void {
    this.dialogRef.close();
  }


  async RegistrarD() {
    //this.datosDirectivo;
    try {
      if (this.registrodForm.valid) {
        
        const res = await this.RegistrarUsuario(this.datosDirectivo)
          .catch(error => { console.log('error', error); this.dialogRef.close(); })

        //se crea la coleccion
        if (res) {
          console.log('registrado con éxito');
          const path = 'Usuarios';
          const id = res.user?.uid;
          this.datosDirectivo.uid = id;
          console.log('datos->', this.datosDirectivo);
          this.datosDirectivo.clave = '';

          await this.authService.CrearDoc(this.datosDirectivo, path, id).then(() => {
            //deberia haber mensajes que interactuen con el usuario   
            this.toastr.success("Guardado con éxito", '', {
              positionClass: 'toast-top-right'
            });
            //this.registrodForm.reset();
            this.dialogRef.close();
          })
        }


      }
      else {
        this.toastr.error('Datos inválidos, Intente de nuevo', 'ERROR', {
          positionClass: 'toast-top-right'
        });
        this.registrodForm.reset();
      }
    } catch (error) {
      console.log('Error =>', error);
    }
  }
  RegistrarUsuario(datos: Usuarios) {
    return  this.auth.createUserWithEmailAndPassword(datos.email, datos.clave);
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
