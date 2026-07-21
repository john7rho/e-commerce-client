import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductList } from '../../../contracts/productList';
import { ProductService } from '../../../services/common/models/product.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  products: ProductList[] = [];
  currentIndex = 0;
  isLoading = true;
  private rotationTimer?: ReturnType<typeof setInterval>;

  constructor(private productService: ProductService) {}

  get currentProduct(): ProductList | undefined {
    return this.products[this.currentIndex];
  }

  ngOnInit(): void {
    this.productService
      .read(0, 5, () => {}, () => {})
      .then(({ products }) => {
        this.products = products || [];
        this.currentIndex = 0;
        this.isLoading = false;
        this.startRotation();
      })
      .catch(() => {
        this.products = [];
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.stopRotation();
  }

  next(): void {
    if (this.products.length) {
      this.currentIndex = (this.currentIndex + 1) % this.products.length;
    }
  }

  previous(): void {
    if (this.products.length) {
      this.currentIndex =
        (this.currentIndex - 1 + this.products.length) % this.products.length;
    }
  }

  private startRotation(): void {
    this.stopRotation();
    if (this.products.length > 1) {
      this.rotationTimer = setInterval(() => this.next(), 5000);
    }
  }

  private stopRotation(): void {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
      this.rotationTimer = undefined;
    }
  }
}
