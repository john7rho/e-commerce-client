import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartService } from '../../../services/common/cart.service';
import { CartSummaryComponent } from './cart-summary.component';

describe('CartSummaryComponent', () => {
  let component: CartSummaryComponent;
  let fixture: ComponentFixture<CartSummaryComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [CartSummaryComponent],
      providers: [CartService],
    }).compileComponents();

    fixture = TestBed.createComponent(CartSummaryComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect the cart count and subtotal', () => {
    cartService.addToCart({ id: '1', name: 'Book', price: 12.5 });
    cartService.addToCart({ id: '1', name: 'Book', price: 12.5 });
    fixture.detectChanges();

    const rendered = fixture.nativeElement as HTMLElement;
    expect(rendered.querySelector('.badge')?.textContent?.trim()).toBe('2');
    expect(rendered.textContent).toContain('$25.00');
  });
});
