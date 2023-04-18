import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsComponent } from './products.component';
import { RegisterProductComponent } from './components/register-product/register-product.component';

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductListComponent,
    ProductFormComponent,
    RegisterProductComponent,
    MatTabsModule
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
