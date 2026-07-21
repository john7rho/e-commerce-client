import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.removeItem(ThemeService.STORAGE_KEY);
    document.body.classList.remove(ThemeService.DARK_CLASS);
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    localStorage.removeItem(ThemeService.STORAGE_KEY);
    document.body.classList.remove(ThemeService.DARK_CLASS);
  });

  function build(): ThemeService {
    return TestBed.inject(ThemeService);
  }

  it('should be created and default to light when nothing is stored', () => {
    const service = build();
    expect(service).toBeTruthy();
    expect(service.isDark).toBeFalse();
    expect(document.body.classList.contains(ThemeService.DARK_CLASS)).toBeFalse();
  });

  it('should flip the body class and persist to localStorage when toggled', () => {
    const service = build();

    service.toggle();
    expect(service.isDark).toBeTrue();
    expect(document.body.classList.contains(ThemeService.DARK_CLASS)).toBeTrue();
    expect(localStorage.getItem(ThemeService.STORAGE_KEY)).toBe('dark');

    service.toggle();
    expect(service.isDark).toBeFalse();
    expect(document.body.classList.contains(ThemeService.DARK_CLASS)).toBeFalse();
    expect(localStorage.getItem(ThemeService.STORAGE_KEY)).toBe('light');
  });

  it('should restore the saved dark theme on init', () => {
    localStorage.setItem(ThemeService.STORAGE_KEY, 'dark');

    const service = build();

    expect(service.isDark).toBeTrue();
    expect(document.body.classList.contains(ThemeService.DARK_CLASS)).toBeTrue();
  });

  it('should not overwrite the stored value when restoring', () => {
    localStorage.setItem(ThemeService.STORAGE_KEY, 'dark');
    const service = build();
    service.restore();
    expect(localStorage.getItem(ThemeService.STORAGE_KEY)).toBe('dark');
  });
});
