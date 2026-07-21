import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../services/common/theme.service';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.scss'],
})
export class DarkModeToggleComponent implements OnDestroy {
  isDark = this.themeService.isDark;
  private readonly themeSubscription: Subscription;

  constructor(private themeService: ThemeService) {
    this.themeSubscription = this.themeService.darkMode$.subscribe(
      (isDark) => (this.isDark = isDark)
    );
  }

  toggle(): void {
    this.themeService.toggle();
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
