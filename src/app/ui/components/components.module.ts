import { RegisterModule } from './register/register.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { CartWidgetModule } from './cart-widget/cart-widget.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    ProductsModule,
    BasketsModule,
    RegisterModule,
    CartWidgetModule,
    // LoginModule,
  ],
  exports: [CartWidgetModule],
})
export class ComponentsModule {}
