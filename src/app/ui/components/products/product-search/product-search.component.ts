import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductList } from '../../../../contracts/productList';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnChanges {
  @Input() products: ProductList[] = [];
  @Output() filtered = new EventEmitter<ProductList[]>();

  query: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.emitFiltered();
    }
  }

  onQueryChange(query: string): void {
    this.query = query ?? '';
    this.emitFiltered();
  }

  get filteredProducts(): ProductList[] {
    const term = this.query.trim().toLowerCase();
    const source = this.products ?? [];
    if (!term) {
      return source;
    }
    return source.filter((product) =>
      (product.name ?? '').toLowerCase().includes(term)
    );
  }

  private emitFiltered(): void {
    this.filtered.emit(this.filteredProducts);
  }
}
