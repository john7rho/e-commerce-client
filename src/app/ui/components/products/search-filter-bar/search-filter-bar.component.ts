import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-filter-bar',
  templateUrl: './search-filter-bar.component.html',
  styleUrls: ['./search-filter-bar.component.scss'],
})
export class SearchFilterBarComponent {
  @Output() search = new EventEmitter<string>();

  searchTerm = '';

  onInput(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.search.emit(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.search.emit(this.searchTerm);
  }
}
