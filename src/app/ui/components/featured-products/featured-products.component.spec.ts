import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductList } from '../../../contracts/productList';
import { ProductService } from '../../../services/common/models/product.service';
import { FeaturedProductsComponent } from './featured-products.component';

describe('FeaturedProductsComponent', () => {
  let component: FeaturedProductsComponent;
  let fixture: ComponentFixture<FeaturedProductsComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  const products = [
    { id: '1', name: 'First', price: 10, stock: 2, mainImagePath: '' },
    { id: '2', name: 'Second', price: 20, stock: 3, mainImagePath: '' },
    { id: '3', name: 'Third', price: 30, stock: 4, mainImagePath: '' },
  ] as ProductList[];

  beforeEach(async () => {
    productService = jasmine.createSpyObj<ProductService>('ProductService', ['read']);
    productService.read.and.returnValue(
      Promise.resolve({ productsCount: products.length, products })
    );

    await TestBed.configureTestingModule({
      declarations: [FeaturedProductsComponent],
      providers: [{ provide: ProductService, useValue: productService }],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedProductsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads products from ProductService', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(productService.read).toHaveBeenCalledWith(0, 5, jasmine.any(Function), jasmine.any(Function));
    expect(component.products).toEqual(products);
    expect(fixture.nativeElement.textContent).toContain('First');
    component.ngOnDestroy();
  }));

  it('rotates products automatically', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(component.currentIndex).toBe(0);
    tick(5000);
    expect(component.currentIndex).toBe(1);
    component.ngOnDestroy();
  }));

  it('supports previous and next controls', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    component.next();
    expect(component.currentIndex).toBe(1);
    component.previous();
    expect(component.currentIndex).toBe(0);
    component.previous();
    expect(component.currentIndex).toBe(2);
    component.ngOnDestroy();
  }));
});
