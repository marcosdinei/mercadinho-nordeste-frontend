import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products = [
    {
      description: 'Coca cola lata 350ml',
      price: '2.5',
      code: '123456789',
      category: {id: 1, name: 'Categ'}
    },
    {
      description: 'Desc 1',
      price: '2.5',
      code: '123456789',
      category: {id: 1, name: 'Categ'}
    },
    {
      description: 'Desc 1',
      price: '2.5',
      code: '123456789',
      category: {id: 1, name: 'Categ'}
    }
  ];
  categories = [
    {id: 1, name: 'Refrigerante'},
    {id: 1, name: 'Cerveja'},
    {id: 1, name: 'Pão'},
    {id: 1, name: 'Leite'},
  ]
}
