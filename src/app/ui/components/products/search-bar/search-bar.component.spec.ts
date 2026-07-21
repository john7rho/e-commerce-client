import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ProductFilter, SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the current name and sort on emitChange', () => {
    const emitted: ProductFilter[] = [];
    component.filterChange.subscribe((f) => emitted.push(f));

    component.name = 'keyboard';
    component.sort = 'price-desc';
    component.emitChange();

    expect(emitted.length).toBe(1);
    expect(emitted[0]).toEqual({ name: 'keyboard', sort: 'price-desc' });
  });

  it('should reset fields to defaults and emit on clear', () => {
    const emitted: ProductFilter[] = [];
    component.filterChange.subscribe((f) => emitted.push(f));

    component.name = 'keyboard';
    component.sort = 'price-asc';
    component.clear();

    expect(component.name).toBe('');
    expect(component.sort).toBe('none');
    expect(emitted[emitted.length - 1]).toEqual({ name: '', sort: 'none' });
  });
});
