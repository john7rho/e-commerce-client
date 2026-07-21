import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { ListComponent } from './list/list.component';
import { ProductSearchBarComponent } from './product-search-bar/product-search-bar.component';

@NgModule({
  declarations: [ProductsComponent, ListComponent, ProductSearchBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ProductsComponent }]),
  ],
})
export class ProductsModule {}
