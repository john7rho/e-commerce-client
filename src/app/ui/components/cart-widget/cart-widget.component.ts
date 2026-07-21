import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, CartService } from 'src/app/services/common/models/cart.service';

@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.scss'],
})
export class CartWidgetComponent {
  readonly itemCount$: Observable<number>;
  readonly subtotal$: Observable<number>;

  constructor(private cartService: CartService) {
    this.itemCount$ = this.cartService.items$.pipe(
      map((items) => items.reduce((total, item) => total + item.quantity, 0))
    );
    this.subtotal$ = this.cartService.items$.pipe(
      map((items: CartItem[]) =>
        items.reduce((total, item) => total + item.price * item.quantity, 0)
      )
    );
  }
}
