import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { F01001Component } from './f01001/f01001.component';
import { F01002Component } from './f01002/f01002.component';
import { F02001Component } from './f02001/f02001.component';
import { F03001Component } from './f03001/f03001.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuListComponent } from './menu-list/menu-list.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'logIn',
    component: LoginComponent
  },
  {
    path: 'logOut',
    component: LoginComponent
  },
  {
    path: '',
    component: MenuListComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'F01001',
        component: F01001Component
      },

      {
        path: 'F01002',
        component: F01002Component
      },

      {
        path: 'F02001',
        component: F02001Component
      },

      {
        path: 'F03001',
        component: F03001Component
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true,
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
