import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileUploadComponent } from './file-upload.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { FileUploadDialogComponent } from './../../../dialogs/file-upload-dialog/file-upload-dialog.component';

@NgModule({
  declarations: [FileUploadComponent, FileUploadDialogComponent],
  imports: [CommonModule, NgxFileDropModule, MatDialogModule, MatButtonModule],
  exports: [FileUploadComponent],
})
export class FileUploadModule {}
