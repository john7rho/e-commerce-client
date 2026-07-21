import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  static readonly STORAGE_KEY = 'theme';
  static readonly DARK_CLASS = 'dark-theme';

  private currentTheme: Theme = 'light';

  constructor() {
    this.restore();
  }

  get theme(): Theme {
    return this.currentTheme;
  }

  get isDark(): boolean {
    return this.currentTheme === 'dark';
  }

  restore(): void {
    const saved = localStorage.getItem(ThemeService.STORAGE_KEY);
    this.setTheme(saved === 'dark' ? 'dark' : 'light', false);
  }

  toggle(): Theme {
    this.setTheme(this.isDark ? 'light' : 'dark');
    return this.currentTheme;
  }

  setTheme(theme: Theme, persist: boolean = true): void {
    this.currentTheme = theme;
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add(ThemeService.DARK_CLASS);
    } else {
      body.classList.remove(ThemeService.DARK_CLASS);
    }
    if (persist) {
      localStorage.setItem(ThemeService.STORAGE_KEY, theme);
    }
  }
}
