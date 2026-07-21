import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/common/models/cart.service';
import { ProductList } from '../../../contracts/productList';
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSummaryComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect cart count and subtotal in the template', () => {
    const product: ProductList = {
      id: 'headphones',
      name: 'Aurora Wireless Headphones',
      price: 129.99,
      stock: 10,
      createdDate: new Date(),
      updatedDate: new Date(),
      productImageFiles: [],
      mainImagePath: '',
    };

    cartService.addToCart(product);
    fixture.detectChanges();

    const summary = (fixture.nativeElement as HTMLElement).textContent
      .replace(/\s+/g, ' ')
      .trim();

    expect(summary).toContain('Cart: 1');
    expect(summary).toContain('$129.99');
  });
});
