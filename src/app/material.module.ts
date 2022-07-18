import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';

import {MatGridListModule} from '@angular/material/grid-list';
//se exporta todo lo que se va a utilizar de angular material
@NgModule({
    exports: [
        MatToolbarModule,
        MatCardModule, 
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatRadioModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatMenuModule,
        MatListModule,
        MatCheckboxModule,
        MatGridListModule
    ]
})
export class MaterialModule { }