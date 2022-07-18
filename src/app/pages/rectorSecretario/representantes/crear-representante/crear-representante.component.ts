import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { RepresentantesI } from 'src/app/models/representante.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { InstitucionesService } from 'src/app/services/instituciones.service';
import { RepresentanteService } from 'src/app/services/representante.service';

@Component({
  selector: 'app-crear-representante',
  templateUrl: './crear-representante.component.html',
  styleUrls: ['./crear-representante.component.css']
})
export class CrearRepresentanteComponent implements OnInit {
  cargoList: string[] = ['Rector/a', 'Vicerrector/a', 'Propietario/a', 'Secretario/a', 'Inspector/a'];
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  subscription!: Subscription;
  idInstitucion: any = '';
  nomInstitucion: any = '';
  idUsu: any = '';
  infoInstitucion!: InstitucionesI;
  infoUsu!: Usuarios;
  datosRepresentante: RepresentantesI = {
    idInstitucion: '',
    uid: '',
    prefijo: '',
    nomInstitucion: '',
    nombres: '',
    apellidos: '',
    cargo: '',
    email: '',
    telefono: '',
    celular: '',
  }
  registroRepresentanteForm = new FormGroup({
    idInstitucion: new FormControl(null),
    uid: new FormControl(null),
    nomInstitucion: new FormControl(null),
    prefijo: new FormControl('', Validators.required),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    cargo: new FormControl('', Validators.required),
    email: new FormControl('', (Validators.required, Validators.pattern(this.emailPattern))),
    telefono: new FormControl('', (Validators.minLength(7), Validators.maxLength(10))),
    celular: new FormControl('', (Validators.minLength(10), Validators.maxLength(11))),
  });
  constructor(private authService: AuthService,
    private afs: AngularFirestore,
    private dialogRef: MatDialogRef<CrearRepresentanteComponent>,
    private institucionService: InstitucionesService,
    private toastr: ToastrService,
    private representanteService: RepresentanteService) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }
  msgValidatePrefijo() {
    return this.registroRepresentanteForm.get('prefijo')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateEmail() {
    return this.registroRepresentanteForm.get('email')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateCargo() {
    return this.registroRepresentanteForm.get('cargo')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateNombres() {
    return this.registroRepresentanteForm.get('nombres')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateApellidos() {
    return this.registroRepresentanteForm.get('apellidos')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  async CrearRepresentante() {
    try {
      if (this.registroRepresentanteForm.valid) {
        const idUsuario = await this.authService.GetUid();
        if (idUsuario) {
          this.idUsu = idUsuario;
          console.log('idusuario', this.idUsu);
          this.getDoc<Usuarios>('Usuarios', this.idUsu).subscribe(resUsuario => {
            if (resUsuario) {
              this.infoUsu = resUsuario;
              this.datosRepresentante.idInstitucion = this.infoUsu.idInstitucion;
              this.datosRepresentante.nomInstitucion = this.infoUsu.nomInstitucion;
              console.log('datos usu', this.datosRepresentante);
              if (this.ExistEmail(this.datosRepresentante.email) === true) {
                this.toastr.warning('El representante ya se encuentra registrado', 'DUPLICADOS');
                this.registroRepresentanteForm.reset();
              } else {
                const path = 'Representantes';
                const uid = this.authService.GetId();
                this.datosRepresentante.uid = uid;

                this.authService.CrearDoc(this.datosRepresentante, path, uid).then(() => {
                  this.toastr.success("Guardado con éxito", '', {
                    positionClass: 'toast-top-right'
                  });
                  this.dialogRef.close();
                });
              }
            }
            // console.log('datos usu',this.datosRepresentante);
          });


        } else {
          console.log('no existe uid');
        }
      }
      else {
        this.toastr.error('Datos inválidos, Intente de nuevo', 'ERROR', {
          positionClass: 'toast-top-right'
        });
        this.registroRepresentanteForm.reset();
      }
    } catch (error) {
      console.log('error ->', error);
    }
  }

  ExistEmail(email: any): boolean {
    var exist = false;
    if (email) {
      const repreFiltrada = this.representanteService.arrayRepresentante
        .find(repreFiltradabyemail => repreFiltradabyemail?.email === email);
      console.log('imprime a repreFiltrada', repreFiltrada);
      if (repreFiltrada) {
        exist = true;
        console.log(' existe ', exist);

      } else {
        console.log(' no existe');
        exist = false;
      }
    } else {
      console.log('false fuera del filtro');
      exist = false;
    }
    return exist;
  }
  getDoc<InstitucionesI>(path: string, id: any) {
    return this.afs.collection(path).doc<InstitucionesI>(id).valueChanges()
  }
}
