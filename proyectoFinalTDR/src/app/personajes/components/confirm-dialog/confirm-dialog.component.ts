import { Component, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Personaje } from '../../interfaces/pj.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
  ]
})
export class ConfirmDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Personaje,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  
  onConfirm():void {
    this.dialogRef.close(true);
  }

}
