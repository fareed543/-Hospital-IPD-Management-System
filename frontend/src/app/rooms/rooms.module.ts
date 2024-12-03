import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
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
        component : RoomListComponent
      },
      {
        path : 'details',
        component : RoomDetailsComponent
      },
      {
        path : 'details/:id',
        component : RoomDetailsComponent
      }

    ]
  },

];

@NgModule({
  declarations: [
    RoomListComponent,
    RoomDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule

  ]
})
export class RoomsModule { }
