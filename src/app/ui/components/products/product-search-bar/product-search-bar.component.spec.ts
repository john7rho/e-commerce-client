import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductSearchBarComponent } from './product-search-bar.component';
import { ProductList } from 'src/app/contracts/productList';

function makeProduct(name: string, price: number): ProductList {
  return {
    id: name,
    name,
    price,
    stock: 10,
    createdDate: new Date(),
    updatedDate: new Date(),
    mainImagePath: '',
    productImageFiles: [],
  };
}

describe('ProductSearchBarComponent', () => {
  let component: ProductSearchBarComponent;
  let fixture: ComponentFixture<ProductSearchBarComponent>;

  const seed: ProductList[] = [
    makeProduct('Red Apple', 3),
    makeProduct('Green Apple', 5),
    makeProduct('Banana', 2),
    makeProduct('Cherry', 8),
  ];

  const cardCount = (): number =>
    fixture.nativeElement.querySelectorAll('.card').length;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [ProductSearchBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSearchBarComponent);
    component = fixture.componentInstance;
    component.products = seed.map((p) => ({ ...p }));
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders all loaded products before any query', () => {
    expect(cardCount()).toBe(seed.length);
    expect(component.filteredProducts.length).toBe(seed.length);
  });

  it('narrows the visible product list as the user types (case-insensitive)', () => {
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input');

    input.value = 'apple';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.query).toBe('apple');
    expect(component.filteredProducts.length).toBe(2);
    expect(cardCount()).toBe(2);
    const rendered = fixture.nativeElement.textContent as string;
    expect(rendered).toContain('Red Apple');
    expect(rendered).toContain('Green Apple');
    expect(rendered).not.toContain('Banana');
  });

  it('shows a no-results message when nothing matches', () => {
    component.onQueryChange('zzzz');
    fixture.detectChanges();

    expect(cardCount()).toBe(0);
    const noResults = fixture.nativeElement.querySelector('.no-results');
    expect(noResults).toBeTruthy();
  });

  it('sorts filtered products by price ascending and descending', () => {
    component.onSortChange('price-asc');
    expect(component.filteredProducts.map((p) => p.price)).toEqual([2, 3, 5, 8]);

    component.onSortChange('price-desc');
    expect(component.filteredProducts.map((p) => p.price)).toEqual([8, 5, 3, 2]);
  });

  it('clear() resets the query and restores the full list', () => {
    component.onQueryChange('cherry');
    expect(component.filteredProducts.length).toBe(1);

    component.clear();
    fixture.detectChanges();

    expect(component.query).toBe('');
    expect(component.sort).toBe('default');
    expect(cardCount()).toBe(seed.length);
  });
});
