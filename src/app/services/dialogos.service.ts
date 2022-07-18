import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogI } from '../models/confirm-dialog.interface';
import { MatConfirmDialogComponent } from '../pages/header/mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogosService {

  constructor(private dialog: MatDialog) { }
  ConfirmaDialog(data: ConfirmDialogI){
    return this.dialog.open(MatConfirmDialogComponent,{
      data,
      width: '400px',
      disableClose: true
    }).afterClosed();
  }
}
