import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { CartService, CartProduct } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  const productA: CartProduct = { id: 'a', name: 'Product A', price: 10 };
  const productB: CartProduct = { id: 'b', name: 'Product B', price: 4.5 };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('starts empty', () => {
    expect(service.items).toEqual([]);
    expect(service.itemCount).toBe(0);
    expect(service.subtotal).toBe(0);
  });

  it('add() increments count and subtotal', () => {
    service.add(productA);

    expect(service.itemCount).toBe(1);
    expect(service.subtotal).toBe(10);
    expect(service.items.length).toBe(1);
  });

  it('add() of the same product increases quantity, not item count', () => {
    service.add(productA);
    service.add(productA);

    expect(service.items.length).toBe(1);
    expect(service.items[0].quantity).toBe(2);
    expect(service.itemCount).toBe(2);
    expect(service.subtotal).toBe(20);
  });

  it('add() supports an explicit quantity', () => {
    service.add(productB, 3);

    expect(service.itemCount).toBe(3);
    expect(service.subtotal).toBeCloseTo(13.5);
  });

  it('add() ignores non-positive quantities', () => {
    service.add(productA, 0);
    service.add(productA, -2);

    expect(service.items).toEqual([]);
    expect(service.itemCount).toBe(0);
  });

  it('accumulates distinct products in the subtotal', () => {
    service.add(productA);
    service.add(productB, 2);

    expect(service.items.length).toBe(2);
    expect(service.itemCount).toBe(3);
    expect(service.subtotal).toBeCloseTo(19);
  });

  it('clear() resets the cart', () => {
    service.add(productA);
    service.clear();

    expect(service.items).toEqual([]);
    expect(service.itemCount).toBe(0);
    expect(service.subtotal).toBe(0);
  });

  it('emits reactive count and subtotal via observables', () => {
    const counts: number[] = [];
    const subtotals: number[] = [];

    const countSub = service.itemCount$.subscribe((c) => counts.push(c));
    const subtotalSub = service.subtotal$.subscribe((s) => subtotals.push(s));

    service.add(productA);

    expect(counts).toEqual([0, 1]);
    expect(subtotals).toEqual([0, 10]);

    countSub.unsubscribe();
    subtotalSub.unsubscribe();
  });

  it('does not mutate previously emitted item arrays', () => {
    let firstEmission: unknown[] = [];
    service.items$.pipe(take(1)).subscribe((items) => (firstEmission = items));

    service.add(productA);

    expect(firstEmission).toEqual([]);
  });
});
