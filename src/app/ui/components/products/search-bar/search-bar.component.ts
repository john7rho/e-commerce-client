import { Component, EventEmitter, Output } from '@angular/core';

export type ProductSortOption = 'none' | 'price-asc' | 'price-desc';

export interface ProductFilter {
  name: string;
  sort: ProductSortOption;
}

@Component({
  selector: 'app-product-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output() filterChange = new EventEmitter<ProductFilter>();

  name: string = '';
  sort: ProductSortOption = 'none';

  emitChange(): void {
    this.filterChange.emit({ name: this.name, sort: this.sort });
  }

  clear(): void {
    this.name = '';
    this.sort = 'none';
    this.emitChange();
  }
}
