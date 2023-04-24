import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { FilterProductsComponent } from './components/filter-products/filter-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterProductComponent } from './components/register-product/register-product.component';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductListComponent,
    ProductFormComponent,
    FilterProductsComponent,
    RegisterProductComponent,
    MatTabsModule
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
