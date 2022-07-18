import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RegistroDComponent } from './pages/registro/registroD.component';
@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html' ,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'infcon';
  constructor(private dialog: MatDialog){

  }
  OpenDialog(){
    this.dialog.open(RegistroDComponent,{

    });
  }
}
