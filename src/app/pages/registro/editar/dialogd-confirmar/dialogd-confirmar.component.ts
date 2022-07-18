import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { deleteUser } from '@firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-dialogd-confirmar',
  templateUrl: './dialogd-confirmar.component.html',
  styleUrls: ['./dialogd-confirmar.component.css']
})
export class DialogdConfirmarComponent implements OnInit {

  constructor(
    public router: Router,
    public toastr: ToastrService,
    private adminService: AdministradorService,
    private dialogRef: MatDialogRef<DialogdConfirmarComponent> 
  ) { dialogRef.disableClose= true;}

  ngOnInit(): void {
  }

  DeleteUsuario(){
    deleteUser;
    this.adminService.DeleteUsuario(this.adminService.usuarioSelectedBorrar);
    this.toastr.success('Registro eliminado','');
    this.dialogRef.close();
    return true;
  }

  Close(): void{
    this.dialogRef.close();
  }
}
