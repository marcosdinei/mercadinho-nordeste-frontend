import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Category, Product } from 'src/app/shared/model/product';

import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ProductFormComponent
  ]
})
export class ProductListComponent {
  @Input() products!: Product[];
  @Input() categories!: Category[];

  columns = ['description', 'price', 'category', 'box-price', 'details'];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {

  }

  showDetails(product: Product) {
    this.dialog.open(ProductFormComponent, {data: {product, categories: this.categories}});
  }
}
