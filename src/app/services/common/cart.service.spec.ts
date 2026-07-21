import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should start empty', () => {
    let items;
    let totalCount;
    let subtotal;

    service.items$.subscribe((value) => (items = value));
    service.totalCount$.subscribe((value) => (totalCount = value));
    service.subtotal$.subscribe((value) => (subtotal = value));

    expect(items).toEqual([]);
    expect(totalCount).toBe(0);
    expect(subtotal).toBe(0);
  });

  it('should add an item and calculate count and subtotal', () => {
    service.addToCart({ id: '1', name: 'Book', price: 12.5 });

    let items;
    let totalCount;
    let subtotal;
    service.items$.subscribe((value) => (items = value));
    service.totalCount$.subscribe((value) => (totalCount = value));
    service.subtotal$.subscribe((value) => (subtotal = value));

    expect(items).toEqual([
      { id: '1', name: 'Book', price: 12.5, quantity: 1 },
    ]);
    expect(totalCount).toBe(1);
    expect(subtotal).toBe(12.5);
  });

  it('should increment the quantity for an existing item', () => {
    service.addToCart({ id: '1', name: 'Book', price: 12.5 });
    service.addToCart({ id: '1', name: 'Book', price: 12.5 });

    let items;
    service.items$.subscribe((value) => (items = value));

    expect(items).toEqual([
      { id: '1', name: 'Book', price: 12.5, quantity: 2 },
    ]);
  });

  it('should decrement and remove items', () => {
    service.addToCart({ id: '1', name: 'Book', price: 12.5 });
    service.addToCart({ id: '1', name: 'Book', price: 12.5 });

    service.removeFromCart('1');
    let items;
    service.items$.subscribe((value) => (items = value));
    expect(items).toEqual([
      { id: '1', name: 'Book', price: 12.5, quantity: 1 },
    ]);

    service.removeFromCart('1');
    service.items$.subscribe((value) => (items = value));
    expect(items).toEqual([]);
  });

  it('should clear all items', () => {
    service.addToCart({ id: '1', name: 'Book', price: 12.5 });
    service.addToCart({ id: '2', name: 'Pen', price: 2.5 });

    service.clear();

    let items;
    service.items$.subscribe((value) => (items = value));
    expect(items).toEqual([]);
  });
});
