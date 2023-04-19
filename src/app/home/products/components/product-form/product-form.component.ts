import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

import { Category, Product } from '../../../../shared/model/product';
import { ProductService } from '../../../../shared/services/product.service';

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
  categories$!: Observable<Category[]>;

  hasBox: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {product: Product},
    private service: ProductService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.filterCategory();
  }

  createForm() {
    this.productData = this.formBuilder.group({
      id: [null, Validators.required],
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

    //just to show the dot of float values on the input
    this.productData.get('price')?.setValue(this.productData.get('price')?.value.toString());

    if (this.data.product.box) this.hasBox = true;
    else this.productData.get('box')?.disable();
  }

  displayFn(category: Category): string {
    return category && category.name ? category.name : '';
  }

  filterCategory() {
    this.categories$ = (this.productData.get('category') as FormControl).valueChanges.pipe(
      startWith(''),
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((value: string) => this.service.listCategories(value))
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
      let category = this.productData.get('category')?.value;
      if (!category.id) {
        this.service.createCategory({name: category})
          .pipe(
            switchMap((res: Category) => {
              this.productData.get('category')?.setValue(res);
              this.productData.updateValueAndValidity();
              return this.service.updateProduct(this.productData.value)
            })
          )
          .subscribe();
      } else {
        this.service.updateProduct(this.productData.value).subscribe();
      }
    }
  }
}
