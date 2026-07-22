import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductList } from 'src/app/contracts/productList';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { FeaturedCarouselComponent } from './featured-carousel.component';

function makeProducts(count: number): ProductList[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `p-${i}`,
    name: `Product ${i}`,
    stock: 10 + i,
    price: 9.99 + i,
    createdDate: new Date(),
    updatedDate: new Date(),
    productImageFiles: [],
    mainImagePath: '',
  }));
}

describe('FeaturedCarouselComponent', () => {
  let component: FeaturedCarouselComponent;
  let fixture: ComponentFixture<FeaturedCarouselComponent>;

  const products = makeProducts(3);
  const productServiceStub: Partial<ProductService> = {
    read: () =>
      Promise.resolve({ productsCount: products.length, products }),
  };
  const fileServiceStub: Partial<FileService> = {
    getBaseStorageUrl: () => Promise.resolve({ url: '' }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturedCarouselComponent],
      providers: [
        { provide: ProductService, useValue: productServiceStub },
        { provide: FileService, useValue: fileServiceStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedCarouselComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    component.stopAutoRotate();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads featured products from the service', async () => {
    await component.loadFeaturedProducts();
    expect(component.products.length).toBe(3);
    expect(component.activeIndex).toBe(0);
  });

  it('advances the active slide with next()', async () => {
    await component.loadFeaturedProducts();
    const start = component.activeIndex;
    component.next();
    expect(component.activeIndex).toBe(start + 1);
  });

  it('wraps to the first slide from the last with next()', async () => {
    await component.loadFeaturedProducts();
    component.goTo(component.products.length - 1);
    component.next();
    expect(component.activeIndex).toBe(0);
  });

  it('goes back with prev() and wraps around', async () => {
    await component.loadFeaturedProducts();
    expect(component.activeIndex).toBe(0);
    component.prev();
    expect(component.activeIndex).toBe(component.products.length - 1);
  });

  it('auto-rotates to the next slide on the timer tick', fakeAsync(() => {
    component.loadFeaturedProducts();
    tick();
    const start = component.activeIndex;
    component.startAutoRotate();
    tick(component.autoRotateMs);
    expect(component.activeIndex).toBe((start + 1) % component.products.length);
    component.stopAutoRotate();
  }));
});
