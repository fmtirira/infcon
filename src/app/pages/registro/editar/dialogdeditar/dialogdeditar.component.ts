import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AdministradorService } from 'src/app/services/administrador.service';
import { Usuarios } from 'src/app/models/user';
import { MatDialogRef } from '@angular/material/dialog';
import { Provincias } from 'src/app/models/provincia.interface';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialogdeditar',
  templateUrl: './dialogdeditar.component.html',
  styleUrls: ['./dialogdeditar.component.css'],
  providers:[ProvinciaService]
})
export class DialogdeditarComponent implements OnInit {
  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = []; 
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  directivoRef: any;

  editarDirectivo: Usuarios = {
    uid: '',
    email: '',
    clave: '',
    cedula: '',
    apellidos: '',
    nombres: '',
    nomProvincia:'',
    emailVerified: true,
    /*roles: {
      admin: false,
      presidente:false,
      directivo:true,
      secretarioRector:false
    }*/
    roles: 'directivo'
  }
 
  editardForm = new FormGroup({
    uid: new FormControl(null),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    email: new FormControl('', (Validators.required, Validators.pattern(this.emailPattern))),
    clave: new FormControl('', (Validators.required, Validators.minLength(6))),
    cedula: new FormControl('', (Validators.required, Validators.minLength(10)))   
  });

  constructor(
    public adminService: AdministradorService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public activeRoute: ActivatedRoute, //
    public router: Router,
    public toastr: ToastrService,
    private dialogRef: MatDialogRef<DialogdeditarComponent>
  ) {
    /*this.editardForm = this.formBuilder.group({
      nombresDirectivo: ['', Validators.required],
      apellidosDirectivo: ['', Validators.required],
      emailDirectivo: ['', Validators.required],
      claveDirectivo: ['', Validators.required],
      cedulaDirectivo: ['', Validators.required]
    })
    this.editardForm = this.formBuilder.group({
      //capturar todo lo que tenga el form
      nombresDirectivo: [this.directivoRef.nombresDirectivo],
      apellidosDirectivo: [this.directivoRef.apellidosDirectivo],
      emailDirectivo: [this.directivoRef.emailDirectivo],
      claveDirectivo: [this.directivoRef.claveDirectivo],
      cedulaDirectivo: [this.directivoRef.cedulaDirectivo]
    })*/
    dialogRef.disableClose= true;
  }

  ngOnInit(): void {
    //capturamos el id
   
    /*const uid = this.activeRoute.snapshot.paramMap.get('uid');
    this.adminService.GetUsuarioById(uid).subscribe(res => {
      this.directivoRef = res;
      this.editardForm = this.formBuilder.group({
        //capturar todo lo que tenga el form
        nombresDirectivo: [this.directivoRef.nombresDirectivo],
        apellidosDirectivo: [this.directivoRef.apellidosDirectivo],
        emailDirectivo: [this.directivoRef.emailDirectivo],
        claveDirectivo: [this.directivoRef.claveDirectivo],
        cedulaDirectivo: [this.directivoRef.cedulaDirectivo]
      })

    })*/
    this.editardForm.get('uid')?.setValue(this.adminService.usuarioSelected.uid);
    this.editardForm.get('nombres')?.setValue(this.adminService.usuarioSelected.nombres);
    this.editardForm.get('apellidos')?.setValue(this.adminService.usuarioSelected.apellidos);
    this.editardForm.get('email')?.setValue(this.adminService.usuarioSelected.email);
    this.editardForm.get('cedula')?.setValue(this.adminService.usuarioSelected.cedula);  
  } 
  OnSaveUsuario(data: Usuarios) {
    data.cedula = data.cedula?.toLowerCase();
    const usuaFiltered = this.adminService.arrayUsuariosDirectivo
    .find(usuaFilteredbycedula => usuaFilteredbycedula.cedula === data.cedula);
    if(((this.adminService.usuarioSelected.cedula === data.cedula) && usuaFiltered) || usuaFiltered === undefined)
    {
      this.adminService.UpdateUsuario(data);
      this.toastr.success('Registro actualizado exitosamente', '');
      this.dialogRef.close();
    }else{
      this.toastr.warning('El usuario ya se encuentra registrada','');
    }   
  }

  Salir():void{
    this.dialogRef.close();
  }
  msgValidateApellido() {
    return this.editardForm.get('apellidos')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateNombre() {
    return this.editardForm.get('nombres')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  
  msgValidateCedula() {
    return this.editardForm.get('cedula')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  
  //no estoy usando - me permitia actualizar
  OnSubmit() {
    const uid = this.activeRoute.snapshot.paramMap.get('uid')
    this.adminService.ActualizarDirectivo(this.editardForm.value)
    this.dialogRef.close();
  }

}
