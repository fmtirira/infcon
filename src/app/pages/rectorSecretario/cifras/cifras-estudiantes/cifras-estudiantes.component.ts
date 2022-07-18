import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { InstitucionesI } from 'src/app/models/institucion.interface';
import { Nivel } from 'src/app/models/nivelEducacion.interface';
import { Usuarios } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesService } from 'src/app/services/instituciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-cifras-estudiantes',
  templateUrl: './cifras-estudiantes.component.html',
  styleUrls: ['./cifras-estudiantes.component.css']
})
export class CifrasEstudiantesComponent implements OnInit {

  public InstitucionCollection!: AngularFirestoreCollection<InstitucionesI>;
  public InstitucionDocument!: AngularFirestoreDocument<InstitucionesI>;
  public InstitucionInfo!: Observable<any[]>;
  public myNivelOf$!: Observable<any>;
  public institucionElements: [] = []; //guarda la data de todas las instituciones
  uid: any = ''; //uid del Usuario
  info!: Usuarios; //me permite traer la info a la vista
  infoInstitucion: InstitucionesI[] = [];
  infoInsti!: InstitucionesI;
  //data!: InstitucionesI;
  infoNi!: any; //me permite guardar los object de los niveles
  mujeres = 0;
  hombres = 0;
  total!: number;
  sumaTotal!:number;
  sumaMujeres!:number;
  sumaHombres!: number;
  datosNivelesInsti: any[] = [];
  dataNivel: Nivel[] = [];
  idI:any;

  //me permitira poder actualizar la data de instituciones
  clonedNivel: { [s: string]: Nivel; } = {};
  //form
  nivelesForm: FormGroup; 
  constructor(
    public afs: AngularFirestore,
    public authService: AuthService,
    public toastr: ToastrService,
    public instiService: InstitucionesService,
    private formBuilder: FormBuilder
  ) {
    this.nivelesForm = this.formBuilder.group({
      id: (null),
      nomNivelEducacion: ['', Validators.required],
      hombres: ['', Validators.required],
      mujeres: ['', Validators.required],
      total: (null)
    });

  }

  ngOnInit() {

    this.authService.StateUser().subscribe(res => {

      this.getUid();
    });
  }
  async getUid() {
    const uid = await this.authService.GetUid();
    if (uid) {
      this.uid = uid;
      console.log('uid ->', this.uid);
      this.getInfoUser();
    } else {
      console.log('no existe uid');
    }
  }
  async getInfoUser() {
    const path = 'Usuarios'; 
    const id = this.uid;
    await this.getDoc<Usuarios>(path, id).subscribe(res => {
      if (res) {
        this.info = res;
        const pathI = 'Instituciones';
        //this.InstitucionCollection = this.afs.collection(pathI);        
        this.getDoc<InstitucionesI>(pathI, this.info.idInstitucion).subscribe(resInsti => {
          if (resInsti) {
            this.idI=resInsti.idInstitucion;
            this.infoInsti = resInsti;
            this.infoNi = resInsti?.niveles;
            this.dataNivel = this.infoNi;
            console.log(this.dataNivel);
             this.sumaTotal= this.dataNivel.map(items => items.total).reduce((prev, curr) => parseInt(prev+curr),0);
             
            console.log('Total suma ',this.sumaTotal); 
            this.sumaMujeres= this.dataNivel.map(items => items.mujeres).reduce((prev, curr) => parseInt(prev+curr),0);
           
            console.log('Total suma ',this.sumaMujeres); 
            this.sumaHombres= this.dataNivel.map(items => items.hombres).reduce((prev, curr) => parseInt(prev+curr),0);
            
            console.log('Total suma ',this.sumaHombres);            
          }
          
      
        });
      }

    });
  }


  getInstitucion(id: any): Observable<any> {
    return this.afs.collection('Instituciones').doc(id).snapshotChanges();
  }
  getDoc<Usuarios>(path: string, id: any) {
    return this.afs.collection(path).doc<Usuarios>(id).valueChanges()
  }

  onRowEditInit(niveles: Nivel) {
    this.clonedNivel[niveles.id] =
      { ...niveles };
    console.log('niveles 1', niveles);
  }

  onRowEditSave(nivelesn: Nivel) {
    const lista = [];
    if(nivelesn.hombres>=0 && nivelesn.mujeres>=0 && nivelesn.hombres<1000 && nivelesn.mujeres<1000){
      this.total = parseInt(nivelesn.hombres) + parseInt(nivelesn.mujeres);
    nivelesn.total = this.total;
    console.log('id Insti', this.info.idInstitucion);
    this.infoInsti.idInstitucion = this.info.idInstitucion;

    let item = this.infoInsti.niveles?.find(item => item.id === nivelesn.id);
    if (item) {
      item.hombres = nivelesn.hombres,
      console.log('item ', item.hombres);
    }
    /*   if(nivelesn.id === "anios3"){
        const tresAnios = {
          id: "anios3",
          nomNivelEducacion: "3 Años",
          hombres: nivelesn.hombres,
          mujeres: nivelesn.mujeres,
          total: this.total,           
        };
        
        lista.push(tresAnios);
         
      }
      if(nivelesn.id === "anios4"){
        const cuatroAnios = {
          id: "anios4",
          nomNivelEducacion: "4 Años",
          hombres: nivelesn.hombres,
          mujeres: nivelesn.mujeres,
          total: this.total,            
        };
        lista.push(cuatroAnios);
       
      }
      if(nivelesn.id === "basica1"){
        const primeroB = {
          id: "basica1",
          nomNivelEducacion: "1 Básica",
          hombres: nivelesn.hombres,
          mujeres: nivelesn.mujeres,
          total: this.total, 
        };
        lista.push(primeroB);
        console.log('esta en el if basica1',lista);
     
      }
      if(nivelesn.id === "basica2"){
       const segundoB = {
         id: "basica2",
         nomNivelEducacion: "2 Básica",
         hombres: nivelesn.hombres,
         mujeres: nivelesn.mujeres,
         total: this.total,  
       };
       lista.push(segundoB);
    
     }
     if(nivelesn.id === "basica3"){
       const terceroB = {
         id: "basica3",
         nomNivelEducacion: "3 Básica",
         hombres: nivelesn.hombres,
         mujeres: nivelesn.mujeres,
         total: this.total, 
       };
       lista.push(terceroB);
       
     }
     if(nivelesn.id === "basica4"){
       const cuartoB = {
         id: "basica4",
         nomNivelEducacion: "4 Básica",
         hombres: nivelesn.hombres,
          mujeres: nivelesn.mujeres,
          total: this.total, 
       };
       lista.push(cuartoB);
   
     }
     if(nivelesn.id === "basica5"){
       const quintoB = {
         id: "basica5",
         nomNivelEducacion: "5 Básica",
         hombres: nivelesn.hombres,
         mujeres: nivelesn.mujeres,
         total: this.total,  
       };
       lista.push(quintoB);
     
     }
     if(nivelesn.id === "basica6"){
       const sextoB = {
         id: "basica6",
         nomNivelEducacion: "6 Básica",
         hombres: nivelesn.hombres,
         mujeres: nivelesn.mujeres,
         total: this.total, 
       };
       lista.push(sextoB);
      
     }
     if(nivelesn.id === "basica7"){
       const septimoB = {
         id: "basica6",
         nomNivelEducacion: "7 Básica",
         hombres: nivelesn.hombres,
         mujeres: nivelesn.mujeres,
         total: this.total, 
       };
       lista.push(septimoB);
  
     }
     if(nivelesn.id === "basica8"){
       const octavoB = {
         id: "basica8",
         nomNivelEducacion: "8 Básica",
         hombres: nivelesn.hombres,
         mujeres: nivelesn.mujeres,
         total: this.total, 
       };
       lista.push(octavoB);
   
     }
     if(nivelesn.id === "basica9"){
       const novenoB = {
         id: "basica9",
         nomNivelEducacion: "9 Básica",
         hombres: nivelesn.hombres,
         mujeres: nivelesn.mujeres,
         total: this.total, 
       };
       lista.push(novenoB);
       
     }
     if(nivelesn.id === "basica10"){
       const decimoB = {
         id: "basica10",
         nomNivelEducacion: "10 Básica",
         hombres: nivelesn.hombres,
         mujeres: nivelesn.mujeres,
         total: this.total,  
       };
       lista.push(decimoB);
      
     }
     if(nivelesn.id === "bachi1"){
       const primeroBachi = {
         id: "bachi1",
         nomNivelEducacion: "1 Bachillerato",
         hombres: nivelesn.hombres,
         mujeres: nivelesn.mujeres,
         total: this.total, 
       };
       lista.push(primeroBachi);
       
     }
     if(nivelesn.id === "bachi2"){
       const segundoBachi = {
         id: "bachi2",
         nomNivelEducacion: "2 Bachillerato",
         hombres: nivelesn.hombres,
         mujeres: nivelesn.mujeres,
         total: this.total, 
       };
       lista.push(segundoBachi);
  
     }
     if(nivelesn.id === "bachi3"){
       const terceroBachi = {
         id: "bachi3",
         nomNivelEducacion: "3 Bachillerato",
         hombres: nivelesn.hombres,
         mujeres: nivelesn.mujeres,
         total: this.total,  
       };
       lista.push(terceroBachi);
     }
    
    
     this.infoInsti.niveles = lista; */

    console.log('niveles', this.infoInsti);
    
      this.afs.collection("Instituciones").doc(this.infoInsti.idInstitucion).update({
        niveles: this.infoInsti.niveles,
      }).then(() => {

        this.toastr.success('Registro actualizado exitosamente', '');
      });
   

    }
    else{
      this.toastr.error('Error al actualizar el registro', 'ERROR');
      delete this.dataNivel[nivelesn.id];
    }
  
 
    console.log('niveles 2', nivelesn);
    console.log('object niveles', this.dataNivel);

  }

  onRowEditCancel(niveles: Nivel, index: number) {
    this.dataNivel[index] = this.clonedNivel[niveles.id];
    delete this.dataNivel[niveles.id];
    console.log('niveles 3', niveles);
  }

  //Documento de la institucion
  updateDoc(data: any, id: any) {
    const collection = this.afs.collection('Instituciones');
    return collection.doc(id).update(data);
  }
}
