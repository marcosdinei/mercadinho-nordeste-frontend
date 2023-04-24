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
  params!: {
    page?: number,
    size?: number,
    description?: string,
    minValue?: number,
    maxValue?: number,
    category?: number
  }

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.getProducts({page: 0});
  }

  getProducts(
    params: {
      page?: number,
      size?: number,
      description?: string,
      minValue?: number,
      maxValue?: number,
      category?: number
    }
  ) {
    this.params = params;
    this.products$ = this.service.listProducts(this.params);
  }

  changePage(page: number) {
    this.params.page = page;
    this.getProducts(this.params);
  }
}
