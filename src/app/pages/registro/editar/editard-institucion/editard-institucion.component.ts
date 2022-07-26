import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { Provincias } from 'src/app/models/provincia.interface';
import { InstitucionesService } from 'src/app/services/instituciones.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { CrearInstitucionComponent } from '../../crear-institucion/crear-institucion.component';

@Component({
  selector: 'app-editard-institucion',
  templateUrl: './editard-institucion.component.html',
  styleUrls: ['./editard-institucion.component.css'],
  providers: [ProvinciaService]
})
export class EditardInstitucionComponent implements OnInit {
  institucionRef: any;
  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = [];  
   
  editariForm = new FormGroup({
    idInstitucion: new FormControl(null),    
    codigoAMIE: new FormControl('', (Validators.required, Validators.minLength(8))),
    nomInstitucion: new FormControl('', Validators.required),
    nomProvincia: new FormControl('', Validators.required)

  });
 
  constructor(
    private toastr: ToastrService,
    public instiService: InstitucionesService,
    public provinciaSvc: ProvinciaService,
    public dialogRef: MatDialogRef<CrearInstitucionComponent>
  ) { 
    dialogRef.disableClose= true;
  }

  ngOnInit(): void {
    this.provincias = this.provinciaSvc.GetProvincias();
    //llamarlos tal cual como esta en FIRESTORE
    this.editariForm.get('idInstitucion')?.setValue(this.instiService.instiSelected.idInstitucion);
    this.editariForm.get('codigoAMIE')?.setValue(this.instiService.instiSelected.codigoAMIE);
    this.editariForm.get('nomInstitucion')?.setValue(this.instiService.instiSelected.nomInstitucion);
    this.editariForm.get('nomProvincia')?.setValue(this.instiService.instiSelected.nomProvincia);
  }

  OnSaveInsti(data: InstitucionesI) {
    data.nomInstitucion = data.nomInstitucion?.toLowerCase();
    const instiFiltered = this.instiService.arrayInstitucion
    .find(instiFilteredbynombre => instiFilteredbynombre.nomInstitucion === data.nomInstitucion);
    if(((this.instiService.instiSelected.nomInstitucion === data.nomInstitucion) && instiFiltered) || instiFiltered === undefined)
    {
      this.instiService.UpdateInstitucion(data);
      this.toastr.success('Registro actualizado exitosamente', '');
      this.dialogRef.close(); 
    }else{
      this.toastr.warning('La institución ya se encuentra registrada','');
    }   
  }

  Salir():void{
    this.dialogRef.close();
  }

  msgValidateCodigoAMIE(){
    return this.editariForm.get('codigoAMIE')?.hasError('required') ? 'Campo obligatorio':
    '';
  }
  msgValidateNombre(){
    return this.editariForm.get('nomInstitucion')?.hasError('required') ? 'Campo obligatorio':
    '';
  }
  msgValidateProvincia(){
    return this.editariForm.get('nomProvincia')?.hasError('required') ? 'Campo obligatorio':
    '';
  }

}
