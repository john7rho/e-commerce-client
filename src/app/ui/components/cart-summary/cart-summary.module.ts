import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartSummaryComponent } from './cart-summary.component';

@NgModule({
  declarations: [CartSummaryComponent],
  imports: [CommonModule],
  exports: [CartSummaryComponent],
})
export class CartSummaryModule {}
