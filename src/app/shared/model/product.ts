export interface Product {
  id?: number;
  description: string;
  category: Category;
  price: string;
  code: string;
  box?: ProductBox;
}

export interface ProductBox {
  id?: number;
  quantityProduct: number;
  price: string;
  code: string;
}

export interface Category {
  id?: number;
  name: string;
}
