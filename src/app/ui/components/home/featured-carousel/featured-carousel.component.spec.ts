import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductList } from 'src/app/contracts/productList';
import { ProductService } from 'src/app/services/common/models/product.service';

import { FeaturedCarouselComponent } from './featured-carousel.component';

describe('FeaturedCarouselComponent', () => {
  let component: FeaturedCarouselComponent;
  let fixture: ComponentFixture<FeaturedCarouselComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  const products: ProductList[] = [
    {
      id: 'p-1001',
      name: 'Aurora Wireless Headphones',
      stock: 42,
      price: 129.99,
      createdDate: new Date('2024-01-12T10:00:00.000Z'),
      updatedDate: new Date('2024-06-01T10:00:00.000Z'),
      productImageFiles: [],
      mainImagePath: '',
    },
  ];

  beforeEach(async () => {
    productService = jasmine.createSpyObj<ProductService>('ProductService', [
      'read',
    ]);

    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [FeaturedCarouselComponent],
      providers: [{ provide: ProductService, useValue: productService }],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedCarouselComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.loading).toBeTrue();
  });

  it('should load and map products on init', async () => {
    productService.read.and.callFake(
      async (
        page: number,
        size: number,
        successCallBack?: () => void,
        _errorCallBack?: (errorMessage: string) => void
      ) => {
        successCallBack();
        return { productsCount: products.length, products };
      }
    );

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(productService.read).toHaveBeenCalledWith(
      0,
      6,
      jasmine.any(Function),
      jasmine.any(Function)
    );
    expect(component.products).toEqual(products);
    expect(component.products[0].name).toBe('Aurora Wireless Headphones');
    expect(component.products[0].price).toBe(129.99);
    expect(component.products[0].stock).toBe(42);
    expect(component.loading).toBeFalse();
    expect(component.errorMessage).toBe('');
  });

  it('should set an error message when loading products fails', async () => {
    productService.read.and.callFake(
      async (
        page: number,
        size: number,
        _successCallBack?: () => void,
        errorCallBack?: (errorMessage: string) => void
      ) => {
        errorCallBack('Unable to load products');
        throw new Error('request failed');
      }
    );

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.products).toEqual([]);
    expect(component.loading).toBeFalse();
    expect(component.errorMessage).toBe('Unable to load products');
  });
});
