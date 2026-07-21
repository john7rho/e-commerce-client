import { Component, Input, OnChanges } from '@angular/core';
import { ProductList } from 'src/app/contracts/productList';
import { BaseStorageUrl } from 'src/app/contracts/baseStorageUrl';

export type ProductSortOption = 'default' | 'price-asc' | 'price-desc';

@Component({
  selector: 'app-product-search-bar',
  templateUrl: './product-search-bar.component.html',
  styleUrls: ['./product-search-bar.component.scss'],
})
export class ProductSearchBarComponent implements OnChanges {
  @Input() products: ProductList[] = [];
  @Input() baseStorageUrl: BaseStorageUrl;

  query: string = '';
  sort: ProductSortOption = 'default';
  filteredProducts: ProductList[] = [];

  ngOnChanges(): void {
    this.applyFilter();
  }

  onQueryChange(value: string): void {
    this.query = value ?? '';
    this.applyFilter();
  }

  onSortChange(value: string): void {
    this.sort = (value as ProductSortOption) ?? 'default';
    this.applyFilter();
  }

  clear(): void {
    this.query = '';
    this.sort = 'default';
    this.applyFilter();
  }

  applyFilter(): void {
    const source = this.products ?? [];
    const term = this.query.trim().toLowerCase();

    let result = term
      ? source.filter((p) => (p.name ?? '').toLowerCase().includes(term))
      : [...source];

    if (this.sort === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (this.sort === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    this.filteredProducts = result;
  }
}
