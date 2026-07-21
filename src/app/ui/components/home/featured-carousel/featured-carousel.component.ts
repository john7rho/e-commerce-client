import { Component, OnInit } from '@angular/core';
import { ProductList } from 'src/app/contracts/productList';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-featured-carousel',
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.scss'],
})
export class FeaturedCarouselComponent implements OnInit {
  products: ProductList[] = [];
  loading = true;
  errorMessage = '';

  constructor(private productService: ProductService) {}

  async ngOnInit(): Promise<void> {
    try {
      const data: { productsCount: number; products: ProductList[] } =
        await this.productService.read(
          0,
          6,
          () => {
            this.loading = false;
          },
          (errorMessage) => {
            this.loading = false;
            this.errorMessage = errorMessage;
          }
        );

      this.products = (data.products || []).map<ProductList>((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        createdDate: product.createdDate,
        updatedDate: product.updatedDate,
        mainImagePath: product.productImageFiles?.length
          ? product.productImageFiles.find((image) => image.showcase)?.path || ''
          : '',
        productImageFiles: product.productImageFiles || [],
      }));
      this.loading = false;
    } catch (error) {
      this.loading = false;
      if (!this.errorMessage) {
        this.errorMessage = 'Featured products are currently unavailable.';
      }
    }
  }
}
