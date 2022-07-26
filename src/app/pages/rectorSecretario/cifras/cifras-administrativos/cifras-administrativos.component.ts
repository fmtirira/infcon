import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { CifrasAdministrativoI } from 'src/app/models/cifrasAdministrativo.interface';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CifraAdminitrativoService } from 'src/app/services/cifra-adminitrativo.service';
import { CifrasAdministrativosService } from 'src/app/services/cifras-administrativos.service';
import { InstitucionesService } from 'src/app/services/instituciones.service';

@Component({
  selector: 'app-cifras-administrativos',
  templateUrl: './cifras-administrativos.component.html',
  styleUrls: ['./cifras-administrativos.component.css']
})
export class CifrasAdministrativosComponent implements OnInit {
  activar = false;
  private subscription: Subscription = new Subscription;
  administrativoForm: FormGroup;
  uid: any = ''; //uid del Usuario
  idInstitucion: string = '';
  info!: Usuarios; //me permite traer la info a la vista
  infoInsti!: InstitucionesI;
  idAdmin!: any;
  dataNivel: CifrasAdministrativoI[] = [];
  cifrasAdmin!: any[];
  adminTotal!: number;

  clonedNivel: { [s: string]: CifrasAdministrativoI; } = {};

  constructor(
    public afs: AngularFirestore,
    private router: Router,
    public authService: AuthService,
    public toastr: ToastrService,
    public instiService: InstitucionesService,
    public cifrasAService: CifraAdminitrativoService,
    public cifrasAsService: CifrasAdministrativosService,
    private formBuilder: FormBuilder
  ) {
    this.administrativoForm = this.formBuilder.group({
      idAdmin: (null),
      idInstitucion: (null),
      adminHombres: ['', Validators.required],
      adminMujeres: ['', Validators.required],
      adminTotal: (null)
    });
    this.authService.StateUser().subscribe(idA => {
      if (idA) {
        this.getUid();
      }
    });
  }

  ngOnInit() {
    
  }
  async getUid() {
    const uid = await this.authService.GetUid();
    if (uid) {
      this.uid = uid;
      this.getInfoUser();
    } else {
      console.log('no existe uid');
    }
  }
  getInfoUser() {
    const path = 'Usuarios';
    const id = this.uid;
    this.authService.GetDoc<Usuarios>(path, id).subscribe(res => {
      if (res) {
        this.info = res;
        const idInsti = this.info.idInstitucion;
        if (res.roles === 'secretarioRector') {
          this.activar = true;
        }
        else {
          this.activar = false;
          this.router.navigate(['/inicio']);
        }

        this.authService.GetDoc<InstitucionesI>('Instituciones', idInsti).subscribe(resCifras => {
          if (resCifras) {
            this.infoInsti = resCifras;
            this.idInstitucion = resCifras.idInstitucion;
            this.idAdmin = resCifras?.cifrasAdministrativos;
            this.subscription.add(
              this.cifrasAService.GetAllCifrasAdminsitrativos(this.idInstitucion).subscribe(cifrasA => {
                this.cifrasAdmin = [];
                cifrasA.forEach((element: any) => {
                  this.cifrasAdmin.push({
                    idAdmin: element.payload.doc.uid,
                    ...element.payload.doc.data()
                  })
                })
                this.dataNivel = this.cifrasAdmin;
              })
            )
            this.cifrasAsService.GetAllCifrasAdministrativos()
              .subscribe(cifra => {
              });
          }
        });
      }
    });
  }

  onRowEditInit(adminCifras: CifrasAdministrativoI) {
    this.clonedNivel[adminCifras.idAdmin] =
      { ...adminCifras };
  }

  onRowEditSave(cifrasA: CifrasAdministrativoI) {

    if (cifrasA.adminHombres >= 0 && cifrasA.adminMujeres >= 0 && cifrasA.adminHombres < 1000 && cifrasA.adminMujeres < 1000) {
      this.adminTotal = parseInt(cifrasA.adminHombres) + parseInt(cifrasA.adminMujeres);
      cifrasA.adminTotal = this.adminTotal;
      this.infoInsti.idInstitucion = this.info.idInstitucion;

      this.afs.collection("CifrasAdministrativos").doc(this.infoInsti.cifrasAdministrativos).update({
        adminHombres: cifrasA.adminHombres,
        adminMujeres: cifrasA.adminMujeres,
        adminTotal: cifrasA.adminTotal,
      }).then(() => {

        this.toastr.success('Registro actualizado exitosamente', '');
      });
    }
    else {
      this.toastr.error('Error al actualizar el registro', 'ERROR');
      delete this.dataNivel[cifrasA.idAdmin];
    }
  }

  onRowEditCancel(cifrasA: CifrasAdministrativoI, index: number) {
    this.dataNivel[index] = this.clonedNivel[cifrasA.idAdmin];
    delete this.dataNivel[cifrasA.idAdmin];
  }

}
