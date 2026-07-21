import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductList } from '../../../contracts/productList';

export interface CartItem {
  product: ProductList;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private readonly totalItemCountSubject = new BehaviorSubject<number>(0);
  private readonly subtotalSubject = new BehaviorSubject<number>(0);

  readonly cartItems$ = this.cartItemsSubject.asObservable();
  readonly totalItemCount$ = this.totalItemCountSubject.asObservable();
  readonly subtotal$ = this.subtotalSubject.asObservable();

  addToCart(product: ProductList): void {
    const cartItems = [...this.cartItemsSubject.value];
    const existingItem = cartItems.find(
      (cartItem) => cartItem.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ product, quantity: 1 });
    }

    this.cartItemsSubject.next(cartItems);
    this.totalItemCountSubject.next(
      cartItems.reduce((total, item) => total + item.quantity, 0)
    );
    this.subtotalSubject.next(
      cartItems.reduce(
        (subtotal, item) => subtotal + item.product.price * item.quantity,
        0
      )
    );
  }
}
