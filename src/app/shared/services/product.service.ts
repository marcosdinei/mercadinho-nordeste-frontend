import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ApiResponse, PaginatedData } from '../model/api-response';
import { Category, Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  endpoints = {
    product: () => '/product',
    getProductByCode: (code: string) => `/product/${code}`,
    category: () => '/category'
  }

  constructor(private http: HttpClient) { }

  listProducts(params: any): Observable<PaginatedData> {
    return this.http.get<ApiResponse>(`${environment.server}${this.endpoints.product()}`, { params }).pipe(
      map((res: ApiResponse) => res.data)
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<ApiResponse>(`${environment.server}${this.endpoints.product()}`, product).pipe(
      map((res: ApiResponse) => res.data)
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<ApiResponse>(`${environment.server}${this.endpoints.product()}`, product).pipe(
      map((res: ApiResponse) => res.data)
    );
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<ApiResponse>(`${environment.server}${this.endpoints.category()}`, category).pipe(
      map((res: ApiResponse) => res.data)
    );
  }

  listCategories(name: string): Observable<Category[]> {
    return this.http.get<ApiResponse>(`${environment.server}${this.endpoints.category()}`, {params: {name}}).pipe(
      map((res: ApiResponse) => res.data)
    );
  }
}
