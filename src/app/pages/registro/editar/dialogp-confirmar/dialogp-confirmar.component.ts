import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-dialogp-confirmar',
  templateUrl: './dialogp-confirmar.component.html',
  styleUrls: ['./dialogp-confirmar.component.css']
})
export class DialogpConfirmarComponent implements OnInit {

  constructor(
    public router: Router,
    public toastr: ToastrService,
    private adminService: AdministradorService,
    private dialogRef: MatDialogRef<DialogpConfirmarComponent>
  ) { dialogRef.disableClose= true;}

  ngOnInit(): void {
  }

  DeleteUsuario(){
    this.adminService.DeleteUsuario(this.adminService.usuarioSelectedBorrar);
    this.toastr.success('Registro eliminado','');
    this.dialogRef.close();
    return true;
  }

  Close(): void{
    this.dialogRef.close();
  }
}
