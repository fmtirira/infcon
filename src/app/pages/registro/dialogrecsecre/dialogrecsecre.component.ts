import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { Usuarios } from 'src/app/models/user';
import { AdministradorService } from 'src/app/services/administrador.service';

import { AuthService } from 'src/app/services/auth.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

@Component({
  selector: 'app-dialogrecsecre',
  templateUrl: './dialogrecsecre.component.html',
  styleUrls: ['./dialogrecsecre.component.css'],
  providers: [ProvinciaService]
})
export class DialogrecsecreComponent implements OnInit {
  institucionSeleccionada!: any;
  nombreInstitucionSeleccionada!:any;
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  public SelectedInstitucion: InstitucionesI = { idInstitucion: '', nomInstitucion: '', codigoAMIE: '', nomProvincia: '' };
  instituciones: InstitucionesI[] = [];
  datosRectorSecre: Usuarios = {
    uid: '',
    email: '',
    clave: '',
    apellidos: '',
    nomProvincia: '',
    nombres: '',
    nomInstitucion: '',
    idInstitucion: '',
    emailVerified: true,
    /*roles:{
      admin:false,
      directivo:false,
      presidente:false,
      secretarioRector:true
    }*/
    roles: 'secretarioRector'
  }

  registrorecsecreForm = new FormGroup({
    uid: new FormControl(null),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    email: new FormControl('', (Validators.required, Validators.pattern(this.emailPattern))),
    clave: new FormControl('', (Validators.required, Validators.minLength(6))),
    nomInstitucion: new FormControl('', Validators.required),
    //idInstitucion: new FormControl(null)
  });

  constructor(
    public provinciaSvc: ProvinciaService,
    private dialogRef: MatDialogRef<DialogrecsecreComponent>,
    private adminService: AdministradorService,
    private toastr: ToastrService,
    public authService: AuthService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public auth: AngularFireAuth,
  ) { dialogRef.disableClose = true; }

  ngOnInit(): void {
    this.GetInstituciones();
    this.registrorecsecreForm = this.formBuilder.group({
      uid: new FormControl(null),
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      nomInstitucion: ['', Validators.required],
      //idInstitucion: new FormControl(null)
    })
  }

  //guardado id institucion
  select(event:Event){
    this.institucionSeleccionada = event;
    for (const data of this.instituciones) {
      if(data.idInstitucion === this.institucionSeleccionada){
        this.nombreInstitucionSeleccionada = data.nomInstitucion;        
      }
      
    }
    console.log('nombre institucion', this.nombreInstitucionSeleccionada);
    console.log('seleccion', this.institucionSeleccionada);
  }
  Salir(): void {
    this.dialogRef.close();
  }

  async RegistrarRectorSecre() {

    try {

      if (this.registrorecsecreForm.valid) {
        this.datosRectorSecre.nomInstitucion = this.nombreInstitucionSeleccionada;
        this.datosRectorSecre.idInstitucion = this.institucionSeleccionada;
        
        console.log('datos rector ', this.datosRectorSecre);
        
        const res = await this.RegistrarUsuario(this.datosRectorSecre)
          .catch(error => { 
            console.log('error', error);
            this.toastr.error('Email ya existe, intente de nuevo', 'Error'); 
            this.dialogRef.close(); });
        if (res) {
          console.log('registrado con éxito');
          //se crea la coleccion      
          const path = 'Usuarios';
          const id = res.user?.uid;
          this.datosRectorSecre.uid = id;
          
          this.datosRectorSecre.clave = 'cifrado';
         await this.authService.CrearDoc(this.datosRectorSecre, path, id).then(() => {
          
            //console.log('rector datos ', this.datosRectorSecre);

            this.toastr.success('Guardado con éxito', '', {
              positionClass: 'toast-top-right'
            });
            this.dialogRef.close();
          })
        }
      }
      else {
        this.toastr.error('Datos inválidos, Intente de nuevo', 'ERROR', {
          positionClass: 'toast-top-right'
        });
        this.registrorecsecreForm.reset();
      }
    } catch (error) {
      console.log('error ->', error);
    }
  }

  GetInstituciones() {
    this.authService.GetCollection<InstitucionesI>('Instituciones').subscribe(res => {
      this.instituciones = res;
      //console.log('Instituciones', this.instituciones);
    })
  }

  msgValidateApellido() {
    return this.registrorecsecreForm.get('apellidos')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateNombre() {
    return this.registrorecsecreForm.get('nombres')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateProvincia() {
    return this.registrorecsecreForm.get('nomProvincia')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateEmail() {
    return this.registrorecsecreForm.get('email')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateClave() {
    return this.registrorecsecreForm.get('clave')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  RegistrarUsuario(datos: Usuarios) {
    return this.auth.createUserWithEmailAndPassword(datos.email, datos.clave);
  }

}
