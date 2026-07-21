import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.removeItem('theme');
    document.body.classList.remove('dark-mode');
  });

  afterEach(() => {
    localStorage.removeItem('theme');
    document.body.classList.remove('dark-mode');
  });

  it('should create', () => {
    expect(new ThemeService()).toBeTruthy();
  });

  it('should default to light when no preference is persisted', () => {
    const service = new ThemeService();

    expect(service.isDark).toBeFalse();
    expect(service.darkMode$).toBeTruthy();
    expect(document.body.classList.contains('dark-mode')).toBeFalse();
  });

  it('should toggle the theme and persist the preference', () => {
    const service = new ThemeService();

    service.toggle();
    expect(service.isDark).toBeTrue();
    expect(document.body.classList.contains('dark-mode')).toBeTrue();
    expect(localStorage.getItem('theme')).toBe('dark');

    service.toggle();
    expect(service.isDark).toBeFalse();
    expect(document.body.classList.contains('dark-mode')).toBeFalse();
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should restore a persisted dark preference', () => {
    localStorage.setItem('theme', 'dark');

    const service = new ThemeService();

    expect(service.isDark).toBeTrue();
    expect(document.body.classList.contains('dark-mode')).toBeTrue();
  });
});
