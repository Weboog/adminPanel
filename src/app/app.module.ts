import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApartComponent } from './apart/apart.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ImagesFormComponent } from './apart/images-form/images-form.component';
import { AddFormComponent } from './apart/add-form/add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ApartComponent,
    ImagesFormComponent,
    AddFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
