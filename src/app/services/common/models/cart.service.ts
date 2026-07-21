import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductList } from 'src/app/contracts/productList';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const STORAGE_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>(
    this.load()
  );

  readonly items$: Observable<CartItem[]> = this.itemsSubject.asObservable();

  get items(): CartItem[] {
    return this.itemsSubject.value;
  }

  get itemCount(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  get subtotal(): number {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  addProduct(product: Pick<ProductList, 'id' | 'name' | 'price'>): void {
    const items = this.items.map((item) => ({ ...item }));
    const existing = items.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    this.commit(items);
  }

  removeProduct(id: string): void {
    this.commit(this.items.filter((item) => item.id !== id));
  }

  clear(): void {
    this.commit([]);
  }

  private commit(items: CartItem[]): void {
    this.itemsSubject.next(items);
    this.persist(items);
  }

  private persist(items: CartItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors (e.g. private mode / quota)
    }
  }

  private load(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}
