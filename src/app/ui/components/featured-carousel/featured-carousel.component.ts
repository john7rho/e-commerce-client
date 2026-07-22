import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductList } from 'src/app/contracts/productList';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-featured-carousel',
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.scss'],
})
export class FeaturedCarouselComponent implements OnInit, OnDestroy {
  constructor(
    private productService: ProductService,
    private fileService: FileService
  ) {}

  products: ProductList[] = [];
  activeIndex = 0;
  featuredCount = 5;
  autoRotateMs = 5000;

  private baseStorageUrl = '';
  private timerId: ReturnType<typeof setInterval> | null = null;

  async ngOnInit(): Promise<void> {
    await this.loadFeaturedProducts();
    this.startAutoRotate();
  }

  ngOnDestroy(): void {
    this.stopAutoRotate();
  }

  async loadFeaturedProducts(): Promise<void> {
    try {
      const base = await this.fileService.getBaseStorageUrl();
      this.baseStorageUrl = base?.url ?? '';
    } catch {
      this.baseStorageUrl = '';
    }

    const data = await this.productService.read(
      0,
      this.featuredCount,
      () => {},
      () => {}
    );

    this.products = (data?.products ?? []).map((p) => ({
      ...p,
      mainImagePath: p.productImageFiles?.length
        ? p.productImageFiles.find((img) => img.showcase)?.path ?? ''
        : '',
    }));

    this.activeIndex = 0;
  }

  imageSrc(product: ProductList): string {
    if (product?.mainImagePath) {
      return `${this.baseStorageUrl}/${product.mainImagePath}`;
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
    if (index >= 0 && index < this.products.length) {
      this.activeIndex = index;
    }
  }

  startAutoRotate(): void {
    this.stopAutoRotate();
    if (this.products.length > 1) {
      this.timerId = setInterval(() => this.next(), this.autoRotateMs);
    }
  }

  stopAutoRotate(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
