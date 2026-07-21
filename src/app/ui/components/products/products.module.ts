import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ListComponent } from './list/list.component';
import { SearchFilterBarComponent } from './search-filter-bar/search-filter-bar.component';

@NgModule({
  declarations: [ProductsComponent, ListComponent, SearchFilterBarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProductsComponent }]),
  ],
})
export class ProductsModule {}
