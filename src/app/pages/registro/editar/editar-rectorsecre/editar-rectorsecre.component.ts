import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { Provincias } from 'src/app/models/provincia.interface';
import { Usuarios } from 'src/app/models/user';
import { AdministradorService } from 'src/app/services/administrador.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { CrearRectorsecreComponent } from '../../crear-rectorsecre/crear-rectorsecre.component';

@Component({
  selector: 'app-editar-rectorsecre',
  templateUrl: './editar-rectorsecre.component.html',
  styleUrls: ['./editar-rectorsecre.component.css'],
  providers: [ProvinciaService]
})
export class EditarRectorsecreComponent implements OnInit {
  idA: any;
  activar = false;
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
    roles: 'secretarioRector'
  }
  institucionSeleccionada!: any;
  nombreInstitucionSeleccionada!: any;
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
    private router: Router,
    private toastr: ToastrService,
    public adminService: AdministradorService,
    public authService: AuthService,
    public provinciaSvc: ProvinciaService,
    public dialogRef: MatDialogRef<CrearRectorsecreComponent>
  ) { dialogRef.disableClose = true; }

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

  select(event: Event) {
    this.institucionSeleccionada = event;
    for (const data of this.instituciones) {
      if (data.idInstitucion === this.institucionSeleccionada) {
        this.nombreInstitucionSeleccionada = data.nomInstitucion;
      }

    }

  }

  OnSaveUsuario(data: Usuarios) {
    data.email = data.email?.toLowerCase();
    const usuaFiltered = this.adminService.arrayUsuariosDirectivo
      .find(usuaFilteredbycedula => usuaFilteredbycedula.cedula === data.cedula);
    if (((this.adminService.usuarioSelected.cedula === data.cedula) && usuaFiltered) || usuaFiltered === undefined) {
      this.adminService.UpdateUsuario(data);
      this.toastr.success('Registro actualizado exitosamente', '');
      this.dialogRef.close();
    } else {
      this.toastr.warning('El usuario ya se encuentra registrado', '');
    }
  }

  GetInstituciones() {
    this.authService.GetCollection<InstitucionesI>('Instituciones').subscribe(res => {
      this.instituciones = res;
    })
  }

  Salir(): void {
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
