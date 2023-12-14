import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  template: `
    <h2>Erreur</h2>
    <p>{{ errorMessage }}</p>
    <button mat-button color="primary" (click)="closeDialog()">Fermer</button>
  `,
  imports: [MatButtonModule],
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { errorMessage: string }, private dialogRef: MatDialogRef<ErrorDialogComponent>) {}

  get errorMessage(): string {
    return this.data.errorMessage;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
