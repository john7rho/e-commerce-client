import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FeaturedProductsModule } from '../featured-products/featured-products.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FeaturedProductsModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
  ],
})
export class HomeModule {}
