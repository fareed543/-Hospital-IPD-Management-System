import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineListComponent } from './components/medicine-list/medicine-list.component';
import { MedicineDetailsComponent } from './components/medicine-details/medicine-details.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


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
        component : MedicineListComponent
      },
      {
        path : 'details',
        component : MedicineDetailsComponent
      },
      {
        path : 'details/:id',
        component : MedicineDetailsComponent
      }

    ]
  },

];


@NgModule({
  declarations: [
    MedicineListComponent,
    MedicineDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class MedicineModule { }
