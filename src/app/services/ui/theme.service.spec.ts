import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.classList.remove('dark-theme');
    TestBed.configureTestingModule({
      providers: [ThemeService],
    });
  });

  afterEach(() => {
    localStorage.clear();
    document.body.classList.remove('dark-theme');
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    const service = TestBed.inject(ThemeService);

    expect(service).toBeTruthy();
  });

  it('should default to light with no saved theme', () => {
    const service = TestBed.inject(ThemeService);

    expect(service.theme).toBe('light');
    expect(service.isDark).toBeFalse();
    expect(document.body.classList.contains('dark-theme')).toBeFalse();
  });

  it('should initialize from a saved dark theme', () => {
    localStorage.setItem('theme', 'dark');
    const service = TestBed.inject(ThemeService);

    service.initialize();

    expect(service.theme).toBe('dark');
    expect(service.isDark).toBeTrue();
    expect(document.body.classList.contains('dark-theme')).toBeTrue();
  });

  it('should toggle, persist, and apply the theme', () => {
    const service = TestBed.inject(ThemeService);

    service.toggle();

    expect(service.theme).toBe('dark');
    expect(service.isDark).toBeTrue();
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.body.classList.contains('dark-theme')).toBeTrue();

    service.toggle();

    expect(service.theme).toBe('light');
    expect(service.isDark).toBeFalse();
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.body.classList.contains('dark-theme')).toBeFalse();
  });
});
