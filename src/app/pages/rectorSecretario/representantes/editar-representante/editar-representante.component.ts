import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RepresentantesI } from 'src/app/models/representante.interface';
import { CrearInstitucionComponent } from 'src/app/pages/registro/crear-institucion/crear-institucion.component';
import { RepresentantesService } from 'src/app/services/representantes.service';

@Component({
  selector: 'app-editar-representante',
  templateUrl: './editar-representante.component.html',
  styleUrls: ['./editar-representante.component.css']
})
export class EditarRepresentanteComponent implements OnInit {
  cargoList: string[] = ['Rector/a', 'Vicerrector/a', 'Propietario/a', 'Secretario/a', 'Inspector/a'];
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  editarRepresentanteForm = new FormGroup({
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
  constructor(
    private toastr: ToastrService,
    public representantesService: RepresentantesService,
    public dialogRef: MatDialogRef<CrearInstitucionComponent>) 
    {
      dialogRef.disableClose= true;
    }

  ngOnInit() {
    
    this.editarRepresentanteForm.get('idInstitucion')?.setValue(this.representantesService.representanteSelected.idInstitucion);
    this.editarRepresentanteForm.get('uid')?.setValue(this.representantesService.representanteSelected.uid);
    this.editarRepresentanteForm.get('nomInstitucion')?.setValue(this.representantesService.representanteSelected.nomInstitucion);
    this.editarRepresentanteForm.get('prefijo')?.setValue(this.representantesService.representanteSelected.prefijo);
    this.editarRepresentanteForm.get('nombres')?.setValue(this.representantesService.representanteSelected.nombres);
    this.editarRepresentanteForm.get('apellidos')?.setValue(this.representantesService.representanteSelected.apellidos);
    this.editarRepresentanteForm.get('email')?.setValue(this.representantesService.representanteSelected.email);
    this.editarRepresentanteForm.get('cargo')?.setValue(this.representantesService.representanteSelected.cargo);
    this.editarRepresentanteForm.get('celular')?.setValue(this.representantesService.representanteSelected.celular);
    this.editarRepresentanteForm.get('telefono')?.setValue(this.representantesService.representanteSelected.telefono);
  }

  OnSaveInsti(data: RepresentantesI) {
    data.email = data.email?.toLowerCase();
    const repreFiltered = this.representantesService.arrayRepresentante
    .find(repreFilteredbyemail => repreFilteredbyemail.email === data.email);
    if(((this.representantesService.representanteSelected.email === data.email) && repreFiltered) || repreFiltered === undefined)
    {
      this.representantesService.UpdateRepresentante(data);
      this.toastr.success('Registro actualizado exitosamente', '');
      this.dialogRef.close(); 
    }else{
      this.toastr.warning('Representante ya se encuentra registrado','');
    }   
  }
  msgValidatePrefijo() {
    return this.editarRepresentanteForm.get('prefijo')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateEmail() {
    return this.editarRepresentanteForm.get('email')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateCargo() {
    return this.editarRepresentanteForm.get('cargo')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateNombres() {
    return this.editarRepresentanteForm.get('nombres')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateApellidos() {
    return this.editarRepresentanteForm.get('apellidos')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
}
