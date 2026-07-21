import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FeaturedCarouselComponent } from './featured-carousel/featured-carousel.component';

@NgModule({
  declarations: [HomeComponent, FeaturedCarouselComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
  ],
})
export class HomeModule {}
