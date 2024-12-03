import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MedicineDialogComponent } from './dialogs/medicine-dialog/medicine-dialog.component';
import { PatientComponent } from './components/patient/patient.component';
import { RoomDialogComponent } from './dialogs/room-dialog/room-dialog.component';
import { InvoiceDialogComponent } from './dialogs/invoice-dialog/invoice-dialog.component';

const routes: Routes = [
  {
    path: '',
    // component: RoomsComponent,
    children : [
      {
        path : '',
        redirectTo : 'list',
        pathMatch : 'full'
      },
      {
        path : 'list',
        component : PatientListComponent
      },
      {
        path : 'details',
        component : PatientComponent
      },
      {
        path : 'details/:id',
        component : PatientComponent
      }

    ]
  },

];

@NgModule({
  declarations: [
    PatientListComponent,
    PatientDetailsComponent,
    MedicineDialogComponent,
    PatientComponent,
    RoomDialogComponent,
    InvoiceDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class PatientModule { }
