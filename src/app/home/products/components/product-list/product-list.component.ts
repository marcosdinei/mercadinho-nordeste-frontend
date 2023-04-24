import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';

import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { PaginatedData } from '../../../../shared/model/api-response';
import { Category, Product } from '../../../../shared/model/product';
import { FilterProductsComponent } from '../filter-products/filter-products.component';
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
    PaginationComponent,
    FilterProductsComponent
  ]
})
export class ProductListComponent {
  @Input() products!: PaginatedData;
  @Input() categories$!: Observable<Category>;
  @Output() page = new EventEmitter<any>();

  columns = ['description', 'price', 'category', 'box-price', 'details'];

  constructor(public dialog: MatDialog) {}

  showDetails(product: Product) {
    let modal = this.dialog.open(ProductFormComponent, {data: {product, categories$: this.categories$}});
    modal.afterClosed().subscribe((reloadPage: boolean) => reloadPage ? this.changePage(0) : {});
  }

  changePage(page: number) {
    this.page.emit(page);
  }
}
