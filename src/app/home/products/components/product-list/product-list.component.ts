import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';

import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { PaginatedData } from '../../../../shared/model/api-response';
import { Product } from '../../../../shared/model/product';
import { ProductService } from '../../../../shared/services/product.service';
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
    ProductFormComponent,
    PaginationComponent
  ]
})
export class ProductListComponent {
  @Input() products!: PaginatedData;
  @Output() page = new EventEmitter<number>();

  columns = ['description', 'price', 'category', 'box-price', 'details'];

  constructor(public dialog: MatDialog, private service: ProductService) {}

  showDetails(product: Product) {
    this.dialog.open(ProductFormComponent, {data: {product}});
  }

  changePage(page: number) {
    this.page.emit(page);
  }
}
