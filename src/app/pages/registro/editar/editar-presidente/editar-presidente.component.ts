import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Provincias } from 'src/app/models/provincia.interface';
import { Usuarios } from 'src/app/models/user';
import { AdministradorService } from 'src/app/services/administrador.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { CrearPresidenteComponent } from '../../crear-presidente/crear-presidente.component';

@Component({
  selector: 'app-editar-presidente',
  templateUrl: './editar-presidente.component.html',
  styleUrls: ['./editar-presidente.component.css'],
  providers: [ProvinciaService] 
})
export class EditarPresidenteComponent implements OnInit {
  presidenteRef: any;
  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = []; 
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  editarpForm = new FormGroup({
    uid: new FormControl(null),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    email: new FormControl('', (Validators.required, Validators.pattern(this.emailPattern))),
    clave: new FormControl('', (Validators.required, Validators.minLength(6))),
    cedula: new FormControl('', (Validators.required, Validators.minLength(10))),
    nomProvincia: new FormControl('', Validators.required)
  });

  constructor(
    public authService: AuthService,
    private toastr: ToastrService,
    public adminService: AdministradorService,
    public provinciaSvc: ProvinciaService,
    public dialogRef: MatDialogRef<CrearPresidenteComponent>
  ) { 
    dialogRef.disableClose= true;
  }

  ngOnInit(): void {
    this.provincias = this.provinciaSvc.GetProvincias();
    //llamarlos tal cual como esta en FIRESTORE
    this.editarpForm.get('uid')?.setValue(this.adminService.usuarioSelected.uid);
    this.editarpForm.get('nombres')?.setValue(this.adminService.usuarioSelected.nombres);
    this.editarpForm.get('apellidos')?.setValue(this.adminService.usuarioSelected.apellidos);
    this.editarpForm.get('email')?.setValue(this.adminService.usuarioSelected.email);
    this.editarpForm.get('nomProvincia')?.setValue(this.adminService.usuarioSelected.nomProvincia); 
    this.editarpForm.get('cedula')?.setValue(this.adminService.usuarioSelected.cedula);  
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
    return this.editarpForm.get('apellidos')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateNombre() {
    return this.editarpForm.get('nombres')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateProvincia() {
    return this.editarpForm.get('nomProvincia')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateCedula() {
    return this.editarpForm.get('cedula')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }

}
