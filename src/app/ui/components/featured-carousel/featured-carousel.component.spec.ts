import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FeaturedCarouselComponent } from './featured-carousel.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductList } from 'src/app/contracts/productList';

function makeProduct(id: string, name: string, price: number): ProductList {
  return {
    id,
    name,
    price,
    stock: 10,
    createdDate: new Date(),
    updatedDate: new Date(),
    productImageFiles: [],
    mainImagePath: '',
  };
}

describe('FeaturedCarouselComponent', () => {
  let component: FeaturedCarouselComponent;
  let fixture: ComponentFixture<FeaturedCarouselComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let fileServiceSpy: jasmine.SpyObj<FileService>;

  const products = [
    makeProduct('p-1', 'Aurora Headphones', 129.99),
    makeProduct('p-2', 'Nimbus Keyboard', 89.5),
    makeProduct('p-3', 'Harbor USB-C Hub', 49),
  ];

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj<ProductService>('ProductService', [
      'read',
    ]);
    fileServiceSpy = jasmine.createSpyObj<FileService>('FileService', [
      'getBaseStorageUrl',
    ]);

    productServiceSpy.read.and.resolveTo({
      productsCount: products.length,
      products: products.map((p) => ({ ...p })),
    });
    fileServiceSpy.getBaseStorageUrl.and.resolveTo({ url: '' });

    await TestBed.configureTestingModule({
      declarations: [FeaturedCarouselComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: FileService, useValue: fileServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedCarouselComponent);
    component = fixture.componentInstance;
    component.intervalMs = 0; // disable auto-play for deterministic assertions
    fixture.detectChanges(); // triggers ngOnInit -> async product load
    await fixture.whenStable();
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads featured products from the product service', () => {
    expect(productServiceSpy.read).toHaveBeenCalled();
    expect(component.products.length).toBe(3);
    expect(component.loading).toBeFalse();
  });

  it('advancing with next() changes the active featured product', () => {
    expect(component.activeIndex).toBe(0);
    expect(component.activeProduct?.id).toBe('p-1');

    component.next();

    expect(component.activeIndex).toBe(1);
    expect(component.activeProduct?.id).toBe('p-2');
  });

  it('prev() moves to the previous product and wraps around', () => {
    expect(component.activeIndex).toBe(0);

    component.prev();

    expect(component.activeIndex).toBe(2);
    expect(component.activeProduct?.id).toBe('p-3');
  });

  it('next() wraps back to the first product at the end', () => {
    component.goTo(2);
    component.next();

    expect(component.activeIndex).toBe(0);
    expect(component.activeProduct?.id).toBe('p-1');
  });

  it('goTo() ignores out-of-range indexes', () => {
    component.goTo(99);
    expect(component.activeIndex).toBe(0);

    component.goTo(-1);
    expect(component.activeIndex).toBe(0);
  });

  it('falls back to the default asset when a product has no image', () => {
    expect(component.imageUrl(products[0])).toBe('assets/product.png');
  });

  it('builds an image url from the base storage url when a path exists', () => {
    const withImage = makeProduct('p-9', 'Imaged', 10);
    withImage.mainImagePath = 'photos/x.png';
    component.baseStorageUrl = { url: 'https://cdn.example.com' };

    expect(component.imageUrl(withImage)).toBe(
      'https://cdn.example.com/photos/x.png'
    );
  });

  it('auto-advances to the next product on the configured interval', fakeAsync(() => {
    component.intervalMs = 1000;
    component.startAutoPlay();

    expect(component.activeIndex).toBe(0);
    tick(1000);
    expect(component.activeIndex).toBe(1);
    tick(1000);
    expect(component.activeIndex).toBe(2);

    component.stopAutoPlay();
  }));

  it('renders the active product name in the template', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.featured-carousel__name')?.textContent).toContain(
      'Aurora Headphones'
    );
  });
});
