import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Cantones, Provincias } from 'src/app/models/provincia.interface';
import { Usuarios } from 'src/app/models/user';
import { AdministradorService } from 'src/app/services/administrador.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { UsupresidentesService } from 'src/app/services/usupresidentes.service';

@Component({
  selector: 'app-crear-presidente',
  templateUrl: './crear-presidente.component.html',
  styleUrls: ['./crear-presidente.component.css'],
  providers: [ProvinciaService]
})
export class CrearPresidenteComponent implements OnInit {
  //registropForm!:FormGroup;
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = [];
  public cantones: Cantones[] = [];

  datosPresidente: Usuarios = {
    uid: '',
    email: '',
    clave: '',
    cedula: '',
    apellidos: '',
    nombres: '',
    nomProvincia: '',
    emailVerified: true,
    foto: '',
    telefono: '',
    prefijo: '',
    roles: 'presidente'
  }

  registropForm = new FormGroup({
    uid: new FormControl(null),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    email: new FormControl('', (Validators.required, Validators.pattern(this.emailPattern))),
    clave: new FormControl('', (Validators.required, Validators.minLength(8), Validators.maxLength(15))),
    cedula: new FormControl('', (Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]\d*$/))),
    nomProvincia: new FormControl('', Validators.required)
  });

  constructor(
    public provinciaSvc: ProvinciaService,
    private dialogRef: MatDialogRef<CrearPresidenteComponent>,
    private adminService: AdministradorService,
    private presidenteSvc: UsupresidentesService,
    public auth: AngularFireAuth,
    private toastr: ToastrService,
    public authService: AuthService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.provincias = this.provinciaSvc.GetProvincias();
    this.registropForm = this.formBuilder.group({
      uid: new FormControl(null),
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      clave: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]\d*$/)]],
      nomProvincia: ['', Validators.required]
    })
  }

  async Salir() {
    this.dialogRef.close();
  }

  async RegistrarP() {
    try {
      if (this.registropForm.valid) {
        if (this.ExistCedulaP(this.datosPresidente.cedula) === true) {
          this.toastr.warning('Ya existe usuario con esta cédula', 'DUPLICADOS');
          this.dialogRef.close();
        }
        else {
          const res = await this.RegistrarUsuario(this.datosPresidente)
            .catch(error => {
              this.toastr.error('Email ya se encuentra registrado', 'ERROR', {
                positionClass: 'toast-top-right'
              });
              this.registropForm.reset();
            });

          if (res) {
            //se crea la coleccion
            const path = 'Usuarios';
            const id = res.user?.uid;
            this.datosPresidente.uid = id;
            this.datosPresidente.clave = 'cifrado';
            await this.authService.CrearDoc(this.datosPresidente, path, id).then(async () => {
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
        this.registropForm.reset();
      }
    } catch (error) {
      this.toastr.error('Datos inválidos, Intente de nuevo', 'ERROR', {
        positionClass: 'toast-top-right'
      });
      this.registropForm.reset();
      //console.log('error ->', error);
    }
  }
  ExistCedulaP(cedula: any): boolean {
    var exist = false;
    if (cedula) {
      const presidenteFiltrado = this.presidenteSvc.arrayUsuariosPresidente
        .find(presidenteFiltrobyCedula => presidenteFiltrobyCedula?.cedula === cedula);
      if (presidenteFiltrado) {
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

  
  msgValidateApellido() {
    return this.registropForm.get('apellidos')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateNombre() {
    return this.registropForm.get('nombres')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateProvincia() {
    return this.registropForm.get('nomProvincia')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateEmail() {
    return this.registropForm.get('email')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateClave() {
    return this.registropForm.get('clave')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateClaveL() {
    return this.registropForm.get('clave')?.hasError('minLength') ? 'mínimo 8 caracteres' :
      '';
  }
  msgValidateCedula() {
    return this.registropForm.get('cedula')?.hasError('required') ? 'Campo obligatorio, Cédula inválida' :
      '';
  }

  RegistrarUsuario(datos: Usuarios) {
    return this.auth.createUserWithEmailAndPassword(datos.email, datos.clave);
  }
}
