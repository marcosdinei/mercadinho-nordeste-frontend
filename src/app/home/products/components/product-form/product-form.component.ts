import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Category, Product } from '../../../../shared/model/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
  ],
  providers: [
    provideNgxMask()
  ]
})
export class ProductFormComponent {
  productData!: FormGroup;
  filteredCategories!: Observable<Category[]>;

  hasBox: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {product: Product, categories: Category[]}
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.filterCategory();
  }

  createForm() {
    this.productData = this.formBuilder.group({
      description: [null, Validators.required],
      category: [null, Validators.required],
      price: [null, Validators.required],
      code: [null, Validators.required],
      box: this.formBuilder.group({
        quantityProduct: [null],
        price: [null],
        code: [null]
      })
    });

    this.productData.patchValue(this.data.product);
    if (this.data.product.box) this.hasBox = true;
    else this.productData.get('box')?.disable();
  }

  displayFn(category: Category): string {
    return category && category.name ? category.name : '';
  }

  private _filter(name: string): Category[] {
    const filterValue = name.toLowerCase();
    return this.data.categories.filter(category => category.name.toLowerCase().includes(filterValue));
  }

  filterCategory() {
    this.filteredCategories = (this.productData.get('category') as FormControl).valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.data.categories.slice();
      })
    );
  }

  hasBoxEvent(hasBox: MatSlideToggleChange) {
    this.hasBox = hasBox.checked
    if (this.hasBox) {
      this.productData.get('box')?.enable();
      this.productData.get('box.quantityProduct')?.setValidators([Validators.required]);
      this.productData.get('box.price')?.setValidators([Validators.required]);
      this.productData.get('box.code')?.setValidators([Validators.required]);
    }
    else {
      this.productData.get('box')?.disable();
      this.productData.get('box')?.setValue(
        {
          quantityProduct: null,
          price: null,
          code: null
        }
      );
      this.productData.get('box.quantityProduct')?.clearValidators();
      this.productData.get('box.price')?.clearValidators();
      this.productData.get('box.code')?.clearValidators();
    }
    this.productData.get('box.quantityProduct')?.updateValueAndValidity();
    this.productData.get('box.price')?.updateValueAndValidity();
    this.productData.get('box.code')?.updateValueAndValidity();
  }

  updateProduct() {
    if (this.productData.valid) {
      if (!this.productData.get('category')?.value.id)
        console.log('cadastrar categoria e setar o category com o response');

     console.log('cadastrar produto') ;
    }
  }
}
