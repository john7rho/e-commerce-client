import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductSearchComponent } from './product-search.component';
import { ProductList } from '../../../../contracts/productList';

function mockProduct(name: string): ProductList {
  return {
    id: name,
    name,
    stock: 1,
    price: 1,
    createdDate: new Date(),
    updatedDate: new Date(),
    productImageFiles: [],
    mainImagePath: '',
  };
}

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;

  const products: ProductList[] = [
    mockProduct('Red Apple'),
    mockProduct('Green Apple'),
    mockProduct('Banana'),
    mockProduct('Cherry'),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSearchComponent],
      imports: [FormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    component.products = products;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all products when the query is empty', () => {
    expect(component.filteredProducts.length).toBe(products.length);
  });

  it('should narrow the product list as the user types (case-insensitive)', () => {
    component.onQueryChange('apple');

    const names = component.filteredProducts.map((p) => p.name);
    expect(names).toEqual(['Red Apple', 'Green Apple']);
    expect(component.filteredProducts.length).toBeLessThan(products.length);
  });

  it('should match a case-insensitive substring anywhere in the name', () => {
    component.onQueryChange('AN');

    expect(component.filteredProducts.map((p) => p.name)).toEqual(['Banana']);
  });

  it('should emit the filtered list on query change', () => {
    const emitted: ProductList[][] = [];
    component.filtered.subscribe((list) => emitted.push(list));

    component.onQueryChange('cherry');

    expect(emitted.length).toBe(1);
    expect(emitted[0].map((p) => p.name)).toEqual(['Cherry']);
  });

  it('should return to the full list when the query is cleared', () => {
    component.onQueryChange('apple');
    expect(component.filteredProducts.length).toBe(2);

    component.onQueryChange('');
    expect(component.filteredProducts.length).toBe(products.length);
  });
});
