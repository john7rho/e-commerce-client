import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/common/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent {
  readonly itemCount$: Observable<number> = this.cartService.itemCount$;
  readonly subtotal$: Observable<number> = this.cartService.subtotal$;

  constructor(private cartService: CartService) {}
}
