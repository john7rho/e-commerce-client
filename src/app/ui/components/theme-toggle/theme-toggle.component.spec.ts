import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeService } from 'src/app/services/common/theme.service';
import { ThemeToggleComponent } from './theme-toggle.component';

describe('ThemeToggleComponent', () => {
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let component: ThemeToggleComponent;

  beforeEach(async () => {
    localStorage.removeItem(ThemeService.STORAGE_KEY);
    document.body.classList.remove(ThemeService.DARK_CLASS);

    await TestBed.configureTestingModule({
      declarations: [ThemeToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem(ThemeService.STORAGE_KEY);
    document.body.classList.remove(ThemeService.DARK_CLASS);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isDark).toBeFalse();
  });

  it('should flip the body class and write localStorage when the button is clicked', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button.theme-toggle');

    button.click();
    fixture.detectChanges();

    expect(component.isDark).toBeTrue();
    expect(document.body.classList.contains(ThemeService.DARK_CLASS)).toBeTrue();
    expect(localStorage.getItem(ThemeService.STORAGE_KEY)).toBe('dark');
    expect(button.getAttribute('aria-checked')).toBe('true');

    button.click();
    fixture.detectChanges();

    expect(component.isDark).toBeFalse();
    expect(document.body.classList.contains(ThemeService.DARK_CLASS)).toBeFalse();
    expect(localStorage.getItem(ThemeService.STORAGE_KEY)).toBe('light');
    expect(button.getAttribute('aria-checked')).toBe('false');
  });

  it('should reflect the theme restored from localStorage on init', () => {
    localStorage.setItem(ThemeService.STORAGE_KEY, 'dark');
    // Recreate so ThemeService restores the persisted value on construction.
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [ThemeToggleComponent],
    });
    const restoredFixture = TestBed.createComponent(ThemeToggleComponent);
    restoredFixture.detectChanges();

    expect(restoredFixture.componentInstance.isDark).toBeTrue();
    expect(document.body.classList.contains(ThemeService.DARK_CLASS)).toBeTrue();
  });
});
