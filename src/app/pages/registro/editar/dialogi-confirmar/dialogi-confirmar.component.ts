import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CifrasAdministrativosService } from 'src/app/services/cifras-administrativos.service';
import { CifrasDocentesService } from 'src/app/services/cifras-docentes.service';
import { CifrasEstudiantesService } from 'src/app/services/cifras-estudiantes.service';
import { InstitucionesService } from 'src/app/services/instituciones.service';
import { UsurectorsecreService } from 'src/app/services/usurectorsecre.service';

@Component({
  selector: 'app-dialogi-confirmar',
  templateUrl: './dialogi-confirmar.component.html',
  styleUrls: ['./dialogi-confirmar.component.css']
})
export class DialogiConfirmarComponent implements OnInit {
  InfoUsuario!: Usuarios[];
  informe = false;
  constructor(
    public router: Router,
    public authService: AuthService,
    public rectorSecreSvc: UsurectorsecreService,
    public cifrasAdminSvc: CifrasAdministrativosService,
    public cifrasEstudiantesSvc: CifrasEstudiantesService,
    public cifrasDocentesSvc: CifrasDocentesService,
    public toastr: ToastrService,
    private instiService: InstitucionesService,
    private dialogRef: MatDialogRef<DialogiConfirmarComponent>
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  async EliminarInstitucion() {
    const resultadoFiltro = this.rectorSecreSvc.arrayUsuariosRectorSecre.find(filtrar => filtrar.idInstitucion === this.instiService.instiSelectedBorrar.idInstitucion);
    if (resultadoFiltro) {
      this.informe = true;
    }
    else {
      this.informe = false;
    }

    if (this.informe === false) {
      this.instiService.DeleteInstitucion(this.instiService.instiSelectedBorrar);
      this.cifrasAdminSvc.DeleteDoc('CifrasAdministrativos',this.instiService.instiSelectedBorrar.cifrasAdministrativos);
      await this.toastr.success('Registro eliminado', '');
      this.dialogRef.close();
    }
    else {
      this.toastr.warning('La institución esta vinculada con usuario Rector-Secretario, no es posible eliminar', '');
      this.dialogRef.close();
    }
  }

  Close(): void {
    this.dialogRef.close();
  }

}
