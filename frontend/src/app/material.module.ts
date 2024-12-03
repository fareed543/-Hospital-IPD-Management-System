import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card'; 
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule
  ],
  exports:[
    MatTabsModule,
    MatCardModule,
    MatTableModule
  ]
})
export class MaterialModule { }
