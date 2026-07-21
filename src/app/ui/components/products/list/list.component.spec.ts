import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ListComponent } from './list.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductList } from 'src/app/contracts/productList';

function makeProduct(name: string, price: number): ProductList {
  return {
    id: name,
    name,
    price,
    stock: 1,
    createdDate: new Date(),
    updatedDate: new Date(),
    productImageFiles: [],
    mainImagePath: '',
  };
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  const fixtures: ProductList[] = [
    makeProduct('Aurora Headphones', 129.99),
    makeProduct('Nimbus Keyboard', 89.5),
    makeProduct('Harbor Hub', 49),
  ];

  const productServiceMock = {
    read: jasmine
      .createSpy('read')
      .and.callFake(
        (
          page: number,
          size: number,
          success: () => void,
          error: (m: string) => void
        ) => {
          success();
          return Promise.resolve({
            productsCount: fixtures.length,
            products: fixtures.map((p) => ({ ...p })),
          });
        }
      ),
  };

  const fileServiceMock = {
    getBaseStorageUrl: jasmine
      .createSpy('getBaseStorageUrl')
      .and.returnValue(Promise.resolve({ url: '' })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent, SearchBarComponent],
      imports: [FormsModule],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: FileService, useValue: fileServiceMock },
        { provide: ActivatedRoute, useValue: { params: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products from the service and populate filteredProducts on init', async () => {
    await component.ngOnInit();

    expect(fileServiceMock.getBaseStorageUrl).toHaveBeenCalled();
    expect(productServiceMock.read).toHaveBeenCalled();
    expect(component.products.length).toBe(fixtures.length);
    expect(component.filteredProducts.length).toBe(fixtures.length);
    expect(component.productsCount).toBe(fixtures.length);
  });

  it('should filter by name (case-insensitive substring)', () => {
    component.products = fixtures.map((p) => ({ ...p }));

    component.onFilterChange({ name: 'key', sort: 'none' });

    expect(component.filteredProducts.map((p) => p.name)).toEqual([
      'Nimbus Keyboard',
    ]);
  });

  it('should produce an empty result when nothing matches', () => {
    component.products = fixtures.map((p) => ({ ...p }));

    component.onFilterChange({ name: 'zzz', sort: 'none' });

    expect(component.filteredProducts.length).toBe(0);
  });

  it('should sort by price ascending and descending without mutating source order', () => {
    component.products = fixtures.map((p) => ({ ...p }));

    component.onFilterChange({ name: '', sort: 'price-asc' });
    expect(component.filteredProducts.map((p) => p.price)).toEqual([
      49, 89.5, 129.99,
    ]);

    component.onFilterChange({ name: '', sort: 'price-desc' });
    expect(component.filteredProducts.map((p) => p.price)).toEqual([
      129.99, 89.5, 49,
    ]);

    expect(component.products.map((p) => p.name)).toEqual([
      'Aurora Headphones',
      'Nimbus Keyboard',
      'Harbor Hub',
    ]);
  });

  it('should combine name filter with price sort', () => {
    component.products = [
      makeProduct('Aurora Cable', 30),
      makeProduct('Aurora Headphones', 129.99),
      makeProduct('Harbor Hub', 49),
    ];

    component.onFilterChange({ name: 'aurora', sort: 'price-asc' });

    expect(component.filteredProducts.map((p) => p.name)).toEqual([
      'Aurora Cable',
      'Aurora Headphones',
    ]);
  });
});
