import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartItem } from '../../contracts/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>([]);

  readonly items$ = this.itemsSubject.asObservable();
  readonly totalCount$ = this.items$.pipe(
    map((items) => items.reduce((total, item) => total + item.quantity, 0))
  );
  readonly subtotal$ = this.items$.pipe(
    map((items) =>
      items.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0)
    )
  );

  addToCart(product: { id: string; name: string; price: number }): void {
    const items = this.itemsSubject.value;
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      this.itemsSubject.next(
        items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      return;
    }

    this.itemsSubject.next([...items, { ...product, quantity: 1 }]);
  }

  removeFromCart(id: string): void {
    const items = this.itemsSubject.value;
    const existingItem = items.find((item) => item.id === id);

    if (!existingItem) {
      return;
    }

    if (existingItem.quantity > 1) {
      this.itemsSubject.next(
        items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
      return;
    }

    this.itemsSubject.next(items.filter((item) => item.id !== id));
  }

  clear(): void {
    this.itemsSubject.next([]);
  }
}
