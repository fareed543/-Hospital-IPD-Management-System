import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full'
  },
  {
    path : 'login',
    loadChildren : () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path : 'dashboard',
        loadChildren : () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        
      },
      {
        path : 'staff',
        loadChildren : () => import('./staff/staff.module').then(m => m.StaffModule)
      },
      {
        path : 'rooms',
        loadChildren : () => import('./rooms/rooms.module').then(m => m.RoomsModule)
      },
      {
        path : 'patient',
        loadChildren : () => import('./patient/patient.module').then(m => m.PatientModule)
      },
      {
        path : 'medicine',
        loadChildren : () => import('./medicine/medicine.module').then(m => m.MedicineModule)
      },
      {
        path : 'admissions',
        loadChildren : () => import('./admissions/admissions.module').then(m => m.AdmissionsModule)
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
