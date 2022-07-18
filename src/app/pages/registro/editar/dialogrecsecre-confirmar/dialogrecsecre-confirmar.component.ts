import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-dialogrecsecre-confirmar',
  templateUrl: './dialogrecsecre-confirmar.component.html',
  styleUrls: ['./dialogrecsecre-confirmar.component.css']
})
export class DialogrecsecreConfirmarComponent implements OnInit {

  constructor(
    public router: Router,
    public toastr: ToastrService,
    private adminService: AdministradorService,
    private dialogRef: MatDialogRef<DialogrecsecreConfirmarComponent>

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
