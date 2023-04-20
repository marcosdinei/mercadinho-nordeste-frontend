import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { PaginatedData } from '../../shared/model/api-response';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products$!: Observable<PaginatedData>;

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.getProducts(0);
  }

  getProducts(page: number) {
    this.products$ = this.service.listProducts({page});
  }
}
