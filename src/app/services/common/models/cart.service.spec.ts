import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

const productA = { id: 'a', name: 'Product A', price: 10 };
const productB = { id: 'b', name: 'Product B', price: 5 };

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  afterEach(() => localStorage.clear());

  it('should be created and start empty', () => {
    expect(service).toBeTruthy();
    expect(service.itemCount).toBe(0);
    expect(service.subtotal).toBe(0);
    expect(service.items).toEqual([]);
  });

  it('adds a product and updates count and subtotal', () => {
    service.addProduct(productA);

    expect(service.itemCount).toBe(1);
    expect(service.subtotal).toBe(10);
    expect(service.items.length).toBe(1);
  });

  it('increments quantity when the same product is added again', () => {
    service.addProduct(productA);
    service.addProduct(productA);

    expect(service.items.length).toBe(1);
    expect(service.itemCount).toBe(2);
    expect(service.subtotal).toBe(20);
  });

  it('tracks distinct products and sums the subtotal', () => {
    service.addProduct(productA);
    service.addProduct(productB);

    expect(service.items.length).toBe(2);
    expect(service.itemCount).toBe(2);
    expect(service.subtotal).toBe(15);
  });

  it('emits new state through items$', (done) => {
    service.items$.subscribe((items) => {
      if (items.length === 1) {
        expect(items[0].id).toBe('a');
        done();
      }
    });
    service.addProduct(productA);
  });

  it('removes a product', () => {
    service.addProduct(productA);
    service.addProduct(productB);

    service.removeProduct('a');

    expect(service.items.length).toBe(1);
    expect(service.itemCount).toBe(1);
    expect(service.subtotal).toBe(5);
  });

  it('clears the cart', () => {
    service.addProduct(productA);
    service.clear();

    expect(service.itemCount).toBe(0);
    expect(service.subtotal).toBe(0);
  });

  it('persists to localStorage and rehydrates a fresh instance', () => {
    service.addProduct(productA);
    service.addProduct(productA);

    const stored = JSON.parse(localStorage.getItem('cart')!);
    expect(stored[0].quantity).toBe(2);

    const revived = new CartService();
    expect(revived.itemCount).toBe(2);
    expect(revived.subtotal).toBe(20);
  });

  it('recovers from corrupt localStorage data', () => {
    localStorage.setItem('cart', 'not-json');
    const revived = new CartService();
    expect(revived.items).toEqual([]);
  });
});
