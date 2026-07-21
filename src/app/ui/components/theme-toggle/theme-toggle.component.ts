import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/common/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent implements OnInit {
  isDark: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDark = this.themeService.isDark;
  }

  toggle(): void {
    this.themeService.toggle();
    this.isDark = this.themeService.isDark;
  }
}
