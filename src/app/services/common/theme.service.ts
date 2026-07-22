import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  static readonly STORAGE_KEY = 'theme';
  static readonly DARK_CLASS = 'dark';

  private currentTheme: Theme = 'light';

  init(): void {
    const stored = localStorage.getItem(ThemeService.STORAGE_KEY);
    this.setTheme(stored === 'dark' ? 'dark' : 'light');
  }

  getTheme(): Theme {
    return this.currentTheme;
  }

  isDark(): boolean {
    return this.currentTheme === 'dark';
  }

  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    localStorage.setItem(ThemeService.STORAGE_KEY, theme);
    document.body.classList.toggle(ThemeService.DARK_CLASS, theme === 'dark');
  }

  toggle(): Theme {
    this.setTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
    return this.currentTheme;
  }
}
