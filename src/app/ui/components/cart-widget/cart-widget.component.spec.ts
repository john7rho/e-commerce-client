import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { CartWidgetComponent } from './cart-widget.component';
import { CartService } from 'src/app/services/common/models/cart.service';

describe('CartWidgetComponent', () => {
  let component: CartWidgetComponent;
  let fixture: ComponentFixture<CartWidgetComponent>;
  let cartService: CartService;

  const countEl = () =>
    fixture.nativeElement.querySelector('[data-testid="cart-count"]')
      .textContent.trim();
  const subtotalEl = () =>
    fixture.nativeElement.querySelector('[data-testid="cart-subtotal"]')
      .textContent.trim();

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [CartWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartWidgetComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  afterEach(() => localStorage.clear());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders zero count and zero subtotal initially', () => {
    expect(countEl()).toBe('0');
    expect(subtotalEl()).toBe('$0.00');
  });

  it('increments the navbar cart count and subtotal when a product is added', () => {
    cartService.addProduct({ id: 'a', name: 'Product A', price: 10 });
    fixture.detectChanges();

    expect(countEl()).toBe('1');
    expect(subtotalEl()).toBe('$10.00');

    cartService.addProduct({ id: 'a', name: 'Product A', price: 10 });
    cartService.addProduct({ id: 'b', name: 'Product B', price: 5 });
    fixture.detectChanges();

    expect(countEl()).toBe('3');
    expect(subtotalEl()).toBe('$25.00');
  });
});
