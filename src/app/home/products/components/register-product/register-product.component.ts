import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';

import { Category } from '../../../../shared/model/product';
import { ProductService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatStepperModule,
    MatSlideToggleModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ]
})
export class RegisterProductComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  productData!: FormGroup;

  categories$!: Observable<Category[]>;

  hasBox: boolean = false;

  constructor(private formBuilder: FormBuilder, private service: ProductService) {}

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

    this.productData.get('box')?.disable();
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
    this.hasBox = hasBox.checked;
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

  submitProduct() {
    if (this.productData.valid) {
      let category = this.productData.get('category')?.value;
      if (!category.id) {
        this.service.createCategory({name: category})
          .pipe(
            switchMap((res: Category) => {
              this.productData.get('category')?.setValue(res);
              this.productData.updateValueAndValidity();
              return this.service.createProduct(this.productData.value)
            })
          )
          .subscribe(() => this.resetForm());
      } else {
        this.service.createProduct(this.productData.value).subscribe(() => this.resetForm());
      }
    }
  }

  resetForm() {
    this.productData.reset();
    this.productData.get('box')?.disable();
    this.stepper.reset();
  }
}
