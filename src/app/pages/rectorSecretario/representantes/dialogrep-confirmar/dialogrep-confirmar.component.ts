import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RepresentanteService } from 'src/app/services/representante.service';
import { RepresentantesService } from 'src/app/services/representantes.service';

@Component({
  selector: 'app-dialogrep-confirmar',
  templateUrl: './dialogrep-confirmar.component.html',
  styleUrls: ['./dialogrep-confirmar.component.css']
})
export class DialogrepConfirmarComponent implements OnInit {

  constructor(public router: Router,
    public toastr: ToastrService,
    private representanteService: RepresentantesService,
    private dialogRef: MatDialogRef<DialogrepConfirmarComponent>) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }
  DeleteRepresentante(){
    this.representanteService.DeleteRepresentante(this.representanteService.repreSelectedBorrar);
    this.toastr.success('Registro eliminado','');
    this.dialogRef.close();
    return true;
  }

  Close(): void{
    this.dialogRef.close();
  }

}
