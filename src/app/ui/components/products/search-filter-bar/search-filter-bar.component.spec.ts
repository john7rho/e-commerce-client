import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterBarComponent } from './search-filter-bar.component';

describe('SearchFilterBarComponent', () => {
  let component: SearchFilterBarComponent;
  let fixture: ComponentFixture<SearchFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFilterBarComponent],
      imports: [CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the entered search term', () => {
    const emitSpy = spyOn(component.search, 'emit');

    component.onInput({
      target: { value: '  Camera ' },
    } as unknown as Event);

    expect(emitSpy).toHaveBeenCalledWith('  Camera ');
  });
});
