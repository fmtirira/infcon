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
import { CifrasAdministrativoI } from 'src/app/models/cifrasAdministrativo.interface';


@Component({
  selector: 'app-crear-institucion',
  templateUrl: './crear-institucion.component.html',
  styleUrls: ['./crear-institucion.component.css'],
  providers: [ProvinciaService]
})
export class CrearInstitucionComponent implements OnInit {

  subscription!: Subscription;
  data!: InstitucionesI[];
  public SelectedProvincia: Provincias = { id: 0, nomProvincia: '' };
  public provincias: Provincias[] = [];

  datosInstitucion: InstitucionesI = {
    idInstitucion: '',
    codigoAMIE: '',
    logo: '',
    nomInstitucion: '',
    direccionInstitucion: '',
    jornada: '',
    jurisdiccion: '',
    modalidad: '',
    tipoEducacio: '',
    sostenimiento: '',
    tenenciaEdificio: '',
    zonaInec: '',
    nomProvincia: '',
    nivelEducacion: '',
    cifrasAdministrativos: '',
  }
  datosCifrasAdministrativos: CifrasAdministrativoI = {
    idAdmin: '',
    adminTotal: 0,
    adminMujeres: 0,
    adminHombres: 0,
    nomInstitucion: '',
    idInstitucion: '',
    nomProvincia: '',
  }

  registroiForm = new FormGroup({
    idInstitucion: new FormControl(null),
    codigoAMIE: new FormControl('', (Validators.required, Validators.minLength(7))),
    nomInstitucion: new FormControl('', Validators.required),
    nomProvincia: new FormControl('', Validators.required)

  });

  constructor(private authService: AuthService,
    public provinciaSvc: ProvinciaService,
    private dialogRef: MatDialogRef<CrearInstitucionComponent>,
    private institucionService: InstitucionesService,
    private toastr: ToastrService) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.provincias = this.provinciaSvc.GetProvincias();

  }

  Salir(): void {
    this.dialogRef.close();
  }

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
        const idInstitucion = this.authService.GetId();
        const uidCifraAdministrativo = this.authService.GetId();
        this.datosInstitucion.nomInstitucion = this.datosInstitucion.nomInstitucion?.toLowerCase();
        this.datosInstitucion.codigoAMIE = this.datosInstitucion.codigoAMIE?.toLowerCase();
        this.data = this.institucionService.arrayInstitucion;
        if (this.ExistCodigo(this.datosInstitucion.codigoAMIE) === true || this.ExistNombre(this.datosInstitucion.nomInstitucion)=== true) {
          this.toastr.warning('La institución ya se encuentra registrada', 'DUPLICADOS');
          this.dialogRef.close();
        }
        else{
          this.datosInstitucion.idInstitucion = idInstitucion;
          this.datosInstitucion.cifrasAdministrativos = uidCifraAdministrativo;
          this.datosCifrasAdministrativos.idAdmin = uidCifraAdministrativo;
          this.datosCifrasAdministrativos.nomInstitucion = this.datosInstitucion.nomInstitucion;
          this.datosCifrasAdministrativos.idInstitucion = this.datosInstitucion.idInstitucion;
          this.datosCifrasAdministrativos.nomProvincia = this.datosInstitucion.nomProvincia;
          await this.authService.CrearDoc(this.datosCifrasAdministrativos, 'CifrasAdministrativos', uidCifraAdministrativo).then(() => {
  
          });
          await this.authService.CrearDoc(this.datosInstitucion, path, idInstitucion).then(() => {
            this.toastr.success("Guardado con éxito", '', {
              positionClass: 'toast-top-right'
            });
            this.dialogRef.close();
          }); 
        }
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
  ExistCodigo(codigoAMIE: any): boolean {
    var exist = false;
    if (codigoAMIE) {
      const instiFiltrada = this.institucionService.arrayInstitucion
        .find(repreFiltradabycod => repreFiltradabycod?.codigoAMIE === codigoAMIE);
      if (instiFiltrada) {
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
  ExistNombre(nomInstitucion: any): boolean {
    var exist = false;
    if (nomInstitucion) {
      const instiFiltrada = this.institucionService.arrayInstitucion
        .find(instiFiltrabyNombre => instiFiltrabyNombre?.nomInstitucion === nomInstitucion);
      if (instiFiltrada) {
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

}
