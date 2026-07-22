import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageDialogComponent } from './product-image-dialog.component';
import { AppModule } from '../../app.module';
import {
  MAT_LEGACY_DIALOG_DATA,
  MatLegacyDialogRef,
} from '@angular/material/legacy-dialog';

describe('ProductImageDialogComponent', () => {
  let component: ProductImageDialogComponent;
  let fixture: ComponentFixture<ProductImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: MAT_LEGACY_DIALOG_DATA, useValue: {} },
        { provide: MatLegacyDialogRef, useValue: {} },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
