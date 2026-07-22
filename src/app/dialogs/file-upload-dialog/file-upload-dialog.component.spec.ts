import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadDialogComponent } from './file-upload-dialog.component';
import { AppModule } from '../../app.module';
import {
  MAT_LEGACY_DIALOG_DATA,
  MatLegacyDialogRef,
} from '@angular/material/legacy-dialog';

describe('FileUploadDialogComponent', () => {
  let component: FileUploadDialogComponent;
  let fixture: ComponentFixture<FileUploadDialogComponent>;

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
    fixture = TestBed.createComponent(FileUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
