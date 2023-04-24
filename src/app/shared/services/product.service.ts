import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ApiResponse, PaginatedData } from '../model/api-response';
import { Category, Product, ProductBox } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  endpoints = {
    product: () => '/product',
    getProductByCode: (code: string) => `/product/${code}`,
    getBoxByCode: (code: string) => `/box/${code}`,
    category: () => '/category'
  }

  constructor(private http: HttpClient) { }

  listProducts(
    params: {
      page?: number,
      size?: number,
      description?: string,
      minValue?: number,
      maxValue?: number,
      category?: number
    }
  ): Observable<PaginatedData> {
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

  getProductByCode(code: string): Observable<Product> {
    return this.http.get<ApiResponse>(`${environment.server}${this.endpoints.getProductByCode(code)}`).pipe(
      map((res: ApiResponse) => res.data)
    );
  }

  getBoxByCode(code: string): Observable<ProductBox> {
    return this.http.get<ApiResponse>(`${environment.server}${this.endpoints.getBoxByCode(code)}`).pipe(
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
