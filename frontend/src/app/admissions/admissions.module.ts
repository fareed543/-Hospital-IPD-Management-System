import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmissionListComponent } from './components/admission-list/admission-list.component';
import { AdmissionDetailsComponent } from './components/admission-details/admission-details.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';



const routes: Routes = [
  {
    path: '',
    children : [
      {
        path : '',
        redirectTo : 'list',
        pathMatch : 'full'
      },
      {
        path : 'list',
        component : AdmissionListComponent
      },
      {
        path : 'details',
        component : AdmissionDetailsComponent
      },
      {
        path : 'details/:id',
        component : AdmissionDetailsComponent
      }

    ]
  },

];

@NgModule({
  declarations: [
    AdmissionListComponent,
    AdmissionDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class AdmissionsModule { }
