import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ProductImageDialogComponent } from './product-image-dialog/product-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';

@NgModule({
  declarations: [DeleteDialogComponent, ProductImageDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    FileUploadModule,
  ],
})
export class DialogModule {}
