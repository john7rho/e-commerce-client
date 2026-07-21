import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ProductList } from '../../../contracts/productList';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  const product = (id: string, price: number): ProductList =>
    ({
      id,
      name: `Product ${id}`,
      price,
      stock: 10,
      createdDate: new Date(),
      updatedDate: new Date(),
      productImageFiles: [],
      mainImagePath: '',
    } as ProductList);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start empty with zero count and subtotal', async () => {
    expect(await firstValueFrom(service.cartItems$)).toEqual([]);
    expect(await firstValueFrom(service.totalItemCount$)).toBe(0);
    expect(await firstValueFrom(service.subtotal$)).toBe(0);
  });

  it('should add a product and update count, subtotal, and line items', async () => {
    const headphones = product('headphones', 129.99);

    service.addToCart(headphones);

    expect(await firstValueFrom(service.totalItemCount$)).toBe(1);
    expect(await firstValueFrom(service.subtotal$)).toBe(129.99);
    expect(await firstValueFrom(service.cartItems$)).toEqual([
      { product: headphones, quantity: 1 },
    ]);
  });

  it('should increment quantity and subtotal for the same product', async () => {
    const keyboard = product('keyboard', 89.5);

    service.addToCart(keyboard);
    service.addToCart(keyboard);

    expect(await firstValueFrom(service.totalItemCount$)).toBe(2);
    expect(await firstValueFrom(service.subtotal$)).toBe(179);
    expect(await firstValueFrom(service.cartItems$)).toEqual([
      { product: keyboard, quantity: 2 },
    ]);
  });

  it('should sum quantities and subtotals for different products', async () => {
    const hub = product('hub', 49);
    const monitor = product('monitor', 349);

    service.addToCart(hub);
    service.addToCart(monitor);
    service.addToCart(hub);

    expect(await firstValueFrom(service.totalItemCount$)).toBe(3);
    expect(await firstValueFrom(service.subtotal$)).toBe(447);
    expect(await firstValueFrom(service.cartItems$)).toEqual([
      { product: hub, quantity: 2 },
      { product: monitor, quantity: 1 },
    ]);
  });
});
