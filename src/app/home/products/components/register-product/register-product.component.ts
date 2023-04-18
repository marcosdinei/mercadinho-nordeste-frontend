import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
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
import { map, startWith } from 'rxjs/operators';

import { Category } from '../../../../shared/model/product';

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

  @Input() categories!: Category[];
  filteredCategories!: Observable<Category[]>;

  hasBox: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    this.filterCategory();
  }

  createForm() {
    this.productData = this.formBuilder.group({
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      code: ['', Validators.required],
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

  private _filter(name: string): Category[] {
    const filterValue = name.toLowerCase();
    return this.categories.filter(category => category.name.toLowerCase().includes(filterValue));
  }

  filterCategory() {
    this.filteredCategories = (this.productData.get('category') as FormControl).valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.categories.slice();
      })
    );
  }

  group(control1: AbstractControl, control2: AbstractControl): FormGroup {
    return this.formBuilder.group({control1, control2});
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

  submitProduct() {
    if (this.productData.valid) {
      if (!this.productData.get('category')?.value.id)
        console.log('cadastrar categoria e setar o category com o response');

     console.log('cadastrar produto') ;
    }
    this.productData.reset();
    this.productData.get('box')?.disable();
    this.stepper.reset();
  }
}
