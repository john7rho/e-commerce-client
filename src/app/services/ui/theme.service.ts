import { Injectable } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'theme';
  private currentTheme: Theme = 'light';

  constructor() {
    this.initialize();
  }

  get theme(): Theme {
    return this.currentTheme;
  }

  get isDark(): boolean {
    return this.currentTheme === 'dark';
  }

  initialize(): void {
    const savedTheme = localStorage.getItem(this.storageKey);
    this.currentTheme = savedTheme === 'dark' ? 'dark' : 'light';
    this.applyTheme();
  }

  toggle(): void {
    this.currentTheme = this.isDark ? 'light' : 'dark';
    localStorage.setItem(this.storageKey, this.currentTheme);
    this.applyTheme();
  }

  private applyTheme(): void {
    document.body.classList.toggle('dark-theme', this.isDark);
  }
}
