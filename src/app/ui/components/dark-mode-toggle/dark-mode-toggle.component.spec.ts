import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkModeToggleComponent } from './dark-mode-toggle.component';
import { ThemeService } from 'src/app/services/common/theme.service';

describe('DarkModeToggleComponent', () => {
  let component: DarkModeToggleComponent;
  let fixture: ComponentFixture<DarkModeToggleComponent>;

  beforeEach(async () => {
    localStorage.clear();
    document.body.classList.remove('dark');
    await TestBed.configureTestingModule({
      declarations: [DarkModeToggleComponent],
      providers: [ThemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(DarkModeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
    document.body.classList.remove('dark');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggle should flip the body dark class', () => {
    expect(document.body.classList.contains('dark')).toBeFalse();

    component.toggle();
    expect(component.isDark).toBeTrue();
    expect(document.body.classList.contains('dark')).toBeTrue();

    component.toggle();
    expect(component.isDark).toBeFalse();
    expect(document.body.classList.contains('dark')).toBeFalse();
  });

  it('clicking the button should toggle dark mode', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(document.body.classList.contains('dark')).toBeTrue();
  });
});
