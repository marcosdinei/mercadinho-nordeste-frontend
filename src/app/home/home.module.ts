import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from '../shared/components/footer/footer.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { HomeComponent } from './home.component';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    ProductsModule
  ]
})
export class HomeModule { }
