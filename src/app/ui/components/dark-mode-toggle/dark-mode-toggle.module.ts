import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DarkModeToggleComponent } from './dark-mode-toggle.component';

@NgModule({
  declarations: [DarkModeToggleComponent],
  imports: [CommonModule],
  exports: [DarkModeToggleComponent],
})
export class DarkModeToggleModule {}
