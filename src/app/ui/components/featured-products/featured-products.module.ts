import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturedProductsComponent } from './featured-products.component';

@NgModule({
  declarations: [FeaturedProductsComponent],
  imports: [CommonModule],
  exports: [FeaturedProductsComponent],
})
export class FeaturedProductsModule {}
