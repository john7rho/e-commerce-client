import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CartSummaryComponent } from './cart-summary.component';
import { CartService } from 'src/app/services/common/cart.service';

describe('CartSummaryComponent', () => {
  let component: CartSummaryComponent;
  let fixture: ComponentFixture<CartSummaryComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartSummaryComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  function text(selector: string): string {
    const el: HTMLElement = fixture.nativeElement.querySelector(selector);
    return (el?.textContent ?? '').trim();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a zeroed count and subtotal initially', () => {
    expect(text('.cart-summary__count')).toBe('0');
    expect(text('.cart-summary__subtotal')).toContain('0.00');
  });

  it('renders the count and subtotal after adding to the cart', () => {
    cartService.add({ id: 'a', name: 'Product A', price: 12.5 });
    cartService.add({ id: 'b', name: 'Product B', price: 2.5 });
    fixture.detectChanges();

    expect(text('.cart-summary__count')).toBe('2');
    expect(text('.cart-summary__subtotal')).toContain('15.00');
  });

  it('reflects repeated additions of the same product', () => {
    cartService.add({ id: 'a', name: 'Product A', price: 10 });
    cartService.add({ id: 'a', name: 'Product A', price: 10 });
    fixture.detectChanges();

    expect(text('.cart-summary__count')).toBe('2');
    expect(text('.cart-summary__subtotal')).toContain('20.00');
  });
});
