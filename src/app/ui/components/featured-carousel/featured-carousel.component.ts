import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ProductList } from 'src/app/contracts/productList';
import { BaseStorageUrl } from 'src/app/contracts/baseStorageUrl';
import { ProductService } from 'src/app/services/common/models/product.service';
import { FileService } from 'src/app/services/common/models/file.service';

@Component({
  selector: 'app-featured-carousel',
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.scss'],
})
export class FeaturedCarouselComponent implements OnInit, OnDestroy {
  /** How many products to feature in the carousel. */
  @Input() size: number = 5;
  /** Milliseconds between automatic slide transitions. */
  @Input() intervalMs: number = 4000;

  products: ProductList[] = [];
  activeIndex: number = 0;
  loading: boolean = true;

  baseStorageUrl: BaseStorageUrl = { url: '' };
  private timerId: ReturnType<typeof setInterval> | null = null;

  constructor(
    private productService: ProductService,
    private fileService: FileService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.baseStorageUrl = await this.fileService.getBaseStorageUrl();
    } catch {
      this.baseStorageUrl = { url: '' };
    }

    const data = await this.productService.read(
      0,
      this.size,
      () => {},
      () => {}
    );

    this.products = (data?.products ?? []).map((p) => ({
      ...p,
      mainImagePath: p.productImageFiles?.length
        ? p.productImageFiles.find((i) => i.showcase)?.path ?? ''
        : '',
    }));

    this.loading = false;
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  get activeProduct(): ProductList | undefined {
    return this.products[this.activeIndex];
  }

  imageUrl(product: ProductList): string {
    if (product?.mainImagePath) {
      return `${this.baseStorageUrl.url}/${product.mainImagePath}`;
    }
    return 'assets/product.png';
  }

  next(): void {
    if (!this.products.length) {
      return;
    }
    this.activeIndex = (this.activeIndex + 1) % this.products.length;
  }

  prev(): void {
    if (!this.products.length) {
      return;
    }
    this.activeIndex =
      (this.activeIndex - 1 + this.products.length) % this.products.length;
  }

  goTo(index: number): void {
    if (index < 0 || index >= this.products.length) {
      return;
    }
    this.activeIndex = index;
  }

  startAutoPlay(): void {
    this.stopAutoPlay();
    if (this.intervalMs > 0 && this.products.length > 1) {
      this.timerId = setInterval(() => this.next(), this.intervalMs);
    }
  }

  stopAutoPlay(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
