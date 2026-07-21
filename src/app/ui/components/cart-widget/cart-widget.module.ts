import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartWidgetComponent } from './cart-widget.component';

@NgModule({
  declarations: [CartWidgetComponent],
  imports: [CommonModule],
  exports: [CartWidgetComponent],
})
export class CartWidgetModule {}
