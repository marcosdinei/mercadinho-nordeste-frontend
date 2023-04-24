import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Observable } from 'rxjs';

import { Category } from '../../../../shared/model/product';
import { ProductService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    NgxMaskDirective,
  ],
  providers: [
    provideNgxMask()
  ]
})
export class FilterProductsComponent {
  params!: FormGroup;
  categories$!: Observable<Category[]>;
  @Output() searchParams = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private service: ProductService) {}

  ngOnInit(): void {
    this.createForm();
    this.getCategories();
  }

  createForm() {
    this.params = this.formBuilder.group({
      description: [''],
      minPrice: [''],
      maxPrice: [''],
      category: ['']
    });
  }

  getCategories() {
    this.categories$ = this.service.listCategories('');
  }

  search() {
    this.searchParams.emit(this.params.value);
  }
}
