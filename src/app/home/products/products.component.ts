import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  columns = [
    {
      attribute: 'description',
      name: "Descrição"
    },
    {
      attribute: 'price',
      name: "Preço"
    },
    {
      attribute: 'category',
      name: "Categoria"
    },
    {
      attribute: 'box',
      name: "Preço da caixa"
    }
  ];

  products = [
    {
      description: 'Coca cola lata 350ml',
      price: 2.5,
      category: 'Categ',
      box: 10
    },
    {
      description: 'Desc 1',
      price: 2.5,
      category: 'Categ',
      box: 10
    },
    {
      description: 'Desc 1',
      price: 2.5,
      category: 'Categ',
      box: 10
    }
  ];
}
