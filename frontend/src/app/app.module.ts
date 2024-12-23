import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AddProductComponent } from './add-product/add-product.component';
import { AppComponent } from './app.component';
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    NgModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }