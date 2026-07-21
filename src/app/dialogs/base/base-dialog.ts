import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

export class BaseDialog<DialogComponent> {
  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
