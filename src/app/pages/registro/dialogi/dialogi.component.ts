import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { Provincias } from 'src/app/models/provincia.interface';
import { AuthService } from 'src/app/services/auth.service';
import { InstitucionesService } from 'src/app/services/instituciones.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
 

@Component({
  selector: 'app-dialogi',
  templateUrl: './dialogi.component.html',
  styleUrls: ['./dialogi.component.css'],
  providers: [ProvinciaService]
})
export class DialogiComponent implements OnInit {

  subscription!: Subscription;
  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = [];

  datosInstitucion: InstitucionesI = {
    idInstitucion: '',
    //sale en el crud
    codigoAMIE: '',
    nomInstitucion: '',
    direccionInstitucion: '',
    //matutina y vespertina
    jornada: '',
    jurisdiccion: '',
    modalidad: '',
    tipoEducacio: '',
    sostenimiento: '',
    tenenciaEdificio: '',
    zonaInec: '',
    nomProvincia: '',
    nivelEducacion: '',
    cifrasAdministrativos: [{
      idAdmin: 'cifraAdmin',
      adminHombres: '',
      adminMujeres: '',
    }],
  }

  registroiForm = new FormGroup({
    idInstitucion: new FormControl(null),
    codigoAMIE: new FormControl('', (Validators.required, Validators.minLength(7))),
    nomInstitucion: new FormControl('', Validators.required),
    nomProvincia: new FormControl('', Validators.required)

  });

  constructor(private authService: AuthService,
    public provinciaSvc: ProvinciaService,
    private dialogRef: MatDialogRef<DialogiComponent>,
    private institucionService: InstitucionesService,
    private toastr: ToastrService) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.provincias = this.provinciaSvc.GetProvincias();

    //this.GetInstitucion(); //cuando se inicialice el componente, de inmediato llamara este metodo
  }

  Salir(): void {
    this.dialogRef.close();
  }
  //no estoy utilizando
  OnSaveInsti(data: InstitucionesI) {
    data.nomInstitucion = data.nomInstitucion?.toLowerCase();
    data.codigoAMIE = data.codigoAMIE?.toLowerCase();
    /*if (this.ExistInstitucion(data.nomInstitucion) === true) {
      this.toastr.warning('La Institución ya se encuentra registrada', 'DUPLICADOS');
      this.registroiForm.reset();
    } else {*/
    this.institucionService.AddInstitucion(data);
    this.toastr.success('Guardado con éxito', '');
    this.dialogRef.close();
    //}
  }

  /* ExistInstitucion(nombre: any): boolean {
     var exist = false;
     if (nombre) {
       const instiFiltrada = this.institucionService.arrayInstitucion
         .find(instiFiltradabynombre => instiFiltradabynombre.nomInstitucion === nombre);
       if (instiFiltrada) {
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
 
   ExistInstitucionCod(codigo: any): boolean {
     var exist = false;
     if (codigo) {
 
       const instiFiltrada = this.institucionService.arrayInstitucion
         .find(instiFiltradabycod => instiFiltradabycod.codigoAMIE === codigo);
       if (instiFiltrada) {
         exist = true;
 
       } else {
         exist = false;
 
       }
     } else {
 
       exist = false;
 
     }
     return exist;
   }*/

  msgValidateCodigoAMIE() {
    return this.registroiForm.get('codigoAMIE')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateNombre() {
    return this.registroiForm.get('nomInstitucion')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateProvincia() {
    return this.registroiForm.get('nomProvincia')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }

  async CrearNuevaInstitucion() {
    try {
      if (this.registroiForm.valid) {
        const path = 'Instituciones';
        const idInstitucion = this.authService.GetId(); //
        this.datosInstitucion.idInstitucion = idInstitucion;//
        await this.authService.CrearDoc(this.datosInstitucion, path, idInstitucion).then(() => {
          this.toastr.success("Guardado con éxito", '', {
            positionClass: 'toast-top-right'
          });
          this.dialogRef.close();
        });
      }
      else {
        this.toastr.error('Datos inválidos, Intente de nuevo', 'ERROR', {
          positionClass: 'toast-top-right'
        });
        this.registroiForm.reset();
      }
    } catch (error) {
      console.log('error ->', error);
    }
  }
  //para leer las instituciones que estan guardadas en la BDD- y llamo al observable para subscribirse a los cambios
  GetInstitucion() {
    this.authService.GetCollection<InstitucionesI>('Instituciones').subscribe(res => {

    })
  }


}
