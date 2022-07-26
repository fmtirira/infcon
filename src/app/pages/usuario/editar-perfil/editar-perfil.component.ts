import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  uid: any = ''; //uid del Usuario
  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));
  @ViewChild('fileInput') archivo!: ElementRef;
  photoUrl: any = 'https://firebasestorage.googleapis.com/v0/b/bdinfcon.appspot.com/o/fotouser.png?alt=media&token=906b0703-fb76-4249-a20e-bad5d5004dc1';
  file: any;
  infoUsuario!: Usuarios;
  editarInfoForm = new FormGroup({
    uid: new FormControl(null),
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    telefono: new FormControl(''),
    prefijo: new FormControl(''),
    foto: new FormControl(),
  });
  constructor(
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<EditarPerfilComponent>,
    private authService: AuthService,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.authService.StateUser().subscribe(idA => {
      if (idA) {
        this.GetUid();
      }
    });
  }
  async GetUid() {
    const uid = await this.authService.GetUid();
    if (uid) {
      this.uid = uid;
      this.GetInfoUser();
    } else {
      console.log('no existe uid');
    }
  }
  //
  GetInfoUser() {
    const path = 'Usuarios';
    const id = this.uid;
    this.authService.GetDoc<Usuarios>(path, id).subscribe(resInfo => {
      if (resInfo) {
        this.infoUsuario = resInfo;
        this.editarInfoForm.get('uid')?.setValue(this.infoUsuario.uid);
        this.editarInfoForm.get('nombres')?.setValue(this.infoUsuario.nombres);
        this.editarInfoForm.get('apellidos')?.setValue(this.infoUsuario.apellidos);
        this.editarInfoForm.get('telefono')?.setValue(this.infoUsuario.telefono);
        this.editarInfoForm.get('prefijo')?.setValue(this.infoUsuario.prefijo);
        this.file = this.infoUsuario.foto;
        this.photoUrl = this.infoUsuario.foto;
      }
    });
  }
  async OnSaveUsuario(data: Usuarios) {
    const pathImage = 'Usuarios';
    const name = this.infoUsuario.roles;
    const res = await this.authService.SubirImagen(this.file, pathImage, name);
    data.foto = res;
    this.authService.StateUser().subscribe(obtenerUid => {
      if (obtenerUid) {
        data.uid = obtenerUid.uid;
        this.authService.UpdateDoc(pathImage, data.uid, data).then(() => {
          this.toastr.success('Registro actualizado', '');
          this.dialogRef.close();
        }).catch((error:any)=>{
          this.toastr.error('Datos inválidos,intente de nuevo','ERROR');
        })
      }
    });
    
  }
  async SubirArchivo(event: any) {
    if (event.target.files[0]) {
      const file: File = event.target.files[0];
      const pattern = /image-*/;
      if (!file.type.match(pattern)) {
        this.toastr.error('Formato incorrecto', '');
        return;
      }
      const reader = new FileReader(); // leer el contenido del archivo
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.photoUrl = reader.result;
      };
    }
  }
  msgValidateNombres() {
    return this.editarInfoForm.get('nombres')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }
  msgValidateApellidos() {
    return this.editarInfoForm.get('apellidos')?.hasError('required') ? 'Campo obligatorio' :
      '';
  }

}
