import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , FormArray} from '@angular/forms';
import { NivelGroupI } from 'src/app/models/nivelEducacion.interface';
import { NivelesService } from 'src/app/services/niveles.service';

@Component({
  selector: 'app-dialognivel',
  templateUrl: './dialognivel.component.html',
  styleUrls: ['./dialognivel.component.css']
})
export class DialognivelComponent implements OnInit {
  presidenteRef: any;
  nivelForm!: FormGroup;
  public nivelesEducacion: any[] =[];

  constructor(public formBuilder: FormBuilder,
    public nivelesSvc: NivelesService) {
    
     
  }

  ngOnInit(): void {
    this.nivelesEducacion = this.nivelesSvc.GetNiveles();
  }

}
