import { Component } from '@angular/core';
import { CartService } from '../../../services/common/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent {
  readonly totalCount$ = this.cartService.totalCount$;
  readonly subtotal$ = this.cartService.subtotal$;

  constructor(private cartService: CartService) {}
}
