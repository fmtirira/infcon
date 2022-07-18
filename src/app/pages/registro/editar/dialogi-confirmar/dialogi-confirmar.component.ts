import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesService } from 'src/app/services/instituciones.service';

@Component({
  selector: 'app-dialogi-confirmar',
  templateUrl: './dialogi-confirmar.component.html',
  styleUrls: ['./dialogi-confirmar.component.css']
})
export class DialogiConfirmarComponent implements OnInit {

  constructor(
    public router: Router,
    public toastr: ToastrService,
    private instiService: InstitucionesService,
    private dialogRef: MatDialogRef<DialogiConfirmarComponent>
  ) {
    dialogRef.disableClose = true;
   }

  ngOnInit(): void {
  }

  DeleteInstitucion(){
    this.instiService.DeleteInstitucion(this.instiService.instiSelectedBorrar);
    this.toastr.success('Registro eliminado','');
    this.dialogRef.close();
    return true;
  }

  Close(): void{
    this.dialogRef.close();
  }

}
