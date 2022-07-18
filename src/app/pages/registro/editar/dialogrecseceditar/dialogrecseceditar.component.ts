import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { Provincias } from 'src/app/models/provincia.interface';
import { Usuarios } from 'src/app/models/user';
import { AdministradorService } from 'src/app/services/administrador.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { DialogrecsecreComponent } from '../../dialogrecsecre/dialogrecsecre.component';

@Component({
  selector: 'app-dialogrecseceditar',
  templateUrl: './dialogrecseceditar.component.html',
  styleUrls: ['./dialogrecseceditar.component.css'],
  providers: [ProvinciaService]
})
export class DialogrecseceditarComponent implements OnInit {
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
  institucionSeleccionada!: any;
  nombreInstitucionSeleccionada!:any;
  recsecreRef: any;
  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = []; 
  public instituciones: InstitucionesI[] = [];
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  editarecsecreForm = new FormGroup({
    uid: new FormControl(null),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    email: new FormControl('', (Validators.required, Validators.pattern(this.emailPattern))),
    clave: new FormControl('', (Validators.required, Validators.minLength(6))),    
    nomInstitucion: new FormControl('', Validators.required)
  });

  constructor(
    private toastr: ToastrService,
    public adminService: AdministradorService,
    public authService: AuthService,
    public provinciaSvc: ProvinciaService,
    public dialogRef: MatDialogRef<DialogrecsecreComponent>
  ) { dialogRef.disableClose= true;}

  ngOnInit(): void {
    this.provincias = this.provinciaSvc.GetProvincias();
    this.GetInstituciones();
    //llamarlos tal cual como esta en FIRESTORE
    this.editarecsecreForm.get('uid')?.setValue(this.adminService.usuarioSelected.uid);
    this.editarecsecreForm.get('nombres')?.setValue(this.adminService.usuarioSelected.nombres);
    this.editarecsecreForm.get('apellidos')?.setValue(this.adminService.usuarioSelected.apellidos);
    this.editarecsecreForm.get('email')?.setValue(this.adminService.usuarioSelected.email);    
    this.editarecsecreForm.get('nomInstitucion')?.setValue(this.adminService.usuarioSelected.nomInstitucion); 
  }

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

  OnSaveUsuario(data: Usuarios) {
    data.email = data.email?.toLowerCase();
    const usuaFiltered = this.adminService.arrayUsuariosDirectivo
    .find(usuaFilteredbyemail => usuaFilteredbyemail.email === data.email);
    if(((this.adminService.usuarioSelected.email === data.email) && usuaFiltered) || usuaFiltered === undefined)
    {
      this.adminService.UpdateUsuario(data);
      this.toastr.success('Registro actualizado exitosamente', '');
      this.dialogRef.close();
    }else{
      this.toastr.warning('El usuario ya se encuentra registrada','');
    }   
  }

  GetInstituciones() {
    this.authService.GetCollection<InstitucionesI>('Instituciones').subscribe(res => {
      
      this.instituciones = res;
    })
  }

  Salir():void{
    this.dialogRef.close();
  }
  msgValidateApellido() {
    return this.editarecsecreForm.get('apellidos')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateNombre() {
    return this.editarecsecreForm.get('nombres')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateInstitucion() {
    return this.editarecsecreForm.get('nomInstitucion')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }


}
