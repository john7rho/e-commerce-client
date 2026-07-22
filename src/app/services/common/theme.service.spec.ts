import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.body.classList.remove('dark');
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
    document.body.classList.remove('dark');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to light', () => {
    expect(service.getTheme()).toBe('light');
    expect(service.isDark()).toBeFalse();
  });

  it('toggle should flip theme and write to localStorage', () => {
    expect(service.toggle()).toBe('dark');
    expect(service.isDark()).toBeTrue();
    expect(document.body.classList.contains('dark')).toBeTrue();
    expect(localStorage.getItem(ThemeService.STORAGE_KEY)).toBe('dark');

    expect(service.toggle()).toBe('light');
    expect(service.isDark()).toBeFalse();
    expect(document.body.classList.contains('dark')).toBeFalse();
    expect(localStorage.getItem(ThemeService.STORAGE_KEY)).toBe('light');
  });

  it('init should read persisted dark theme from localStorage', () => {
    localStorage.setItem(ThemeService.STORAGE_KEY, 'dark');
    service.init();
    expect(service.isDark()).toBeTrue();
    expect(document.body.classList.contains('dark')).toBeTrue();
  });

  it('init should default to light when no value persisted', () => {
    service.init();
    expect(service.isDark()).toBeFalse();
    expect(document.body.classList.contains('dark')).toBeFalse();
  });
});
