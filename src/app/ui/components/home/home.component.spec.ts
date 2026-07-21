import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FeaturedProductsModule } from '../featured-products/featured-products.module';
import { ProductService } from '../../../services/common/models/product.service';

const productServiceMock = jasmine.createSpyObj('ProductService', ['read']);
productServiceMock.read.and.returnValue(
  Promise.resolve({ productsCount: 0, products: [] })
);

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [FeaturedProductsModule],
      providers: [
        {
          provide: ProductService,
          useValue: productServiceMock,
        },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
