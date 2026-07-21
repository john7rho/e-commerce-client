import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ListComponent } from './list.component';
import { SearchFilterBarComponent } from '../search-filter-bar/search-filter-bar.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductList } from 'src/app/contracts/productList';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const products: ProductList[] = [
    {
      id: '1',
      name: 'Red Camera',
      price: 100,
      stock: 2,
      createdDate: new Date(),
      updatedDate: new Date(),
      mainImagePath: '',
      productImageFiles: [],
    },
    {
      id: '2',
      name: 'Blue Chair',
      price: 50,
      stock: 3,
      createdDate: new Date(),
      updatedDate: new Date(),
      mainImagePath: '',
      productImageFiles: [],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent, SearchFilterBarComponent],
      imports: [CommonModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ProductService,
          useValue: {
            read: async () => ({
              productsCount: products.length,
              products,
            }),
          },
        },
        {
          provide: FileService,
          useValue: {
            getBaseStorageUrl: async () => ({ url: 'http://storage.test' }),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: { params: of({ pageNumber: 1 }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return all products when the search term is empty', () => {
    component.allProducts = products;

    expect(component.filteredProducts).toEqual(products);
  });

  it('should filter products by name case-insensitively', () => {
    component.allProducts = products;

    component.onSearch('  CAMERA ');

    expect(component.filteredProducts.map((product) => product.name)).toEqual([
      'Red Camera',
    ]);
  });

  it('should return no products for a non-matching search term', () => {
    component.allProducts = products;

    component.onSearch('phone');

    expect(component.filteredProducts).toEqual([]);
  });
});
