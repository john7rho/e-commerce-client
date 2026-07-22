import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/common/theme.service';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.scss'],
})
export class DarkModeToggleComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.init();
  }

  get isDark(): boolean {
    return this.themeService.isDark();
  }

  toggle(): void {
    this.themeService.toggle();
  }
}
