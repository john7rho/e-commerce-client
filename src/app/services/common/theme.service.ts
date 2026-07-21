import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'theme';
  private readonly darkModeSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.setDark(this.readStoredTheme() === 'dark');
  }

  get isDark(): boolean {
    return this.darkModeSubject.value;
  }

  get darkMode$() {
    return this.darkModeSubject.asObservable();
  }

  toggle(): void {
    this.setDark(!this.isDark);
  }

  setDark(isDark: boolean): void {
    this.darkModeSubject.next(isDark);

    if (typeof document !== 'undefined') {
      document.body.classList.toggle('dark-mode', isDark);
    }

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.storageKey, isDark ? 'dark' : 'light');
      }
    } catch {
      // Ignore unavailable storage.
    }
  }

  private readStoredTheme(): string | null {
    try {
      return typeof localStorage !== 'undefined'
        ? localStorage.getItem(this.storageKey)
        : null;
    } catch {
      return null;
    }
  }
}
