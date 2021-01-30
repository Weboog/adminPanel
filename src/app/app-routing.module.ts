import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApartComponent } from './apart/apart.component';
import {ImagesFormComponent} from './apart/images-form/images-form.component';
import {AddFormComponent} from './apart/add-form/add-form.component';


const routes: Routes = [
    {path: '', redirectTo: 'apart/add', pathMatch: 'full'},
    {path: 'apart', component: ApartComponent, children: [
      {path: 'add', component: AddFormComponent},
      {path: 'images', component: ImagesFormComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
