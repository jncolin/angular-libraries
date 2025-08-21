import { Component, Inject, Injectable, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarRef, MatSnackBarModule, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


@Component({
  selector: 'colorized-snackbar',
  template: '<div class="mat-mdc-simple-snack-bar"><div matsnackbarlabel>{{data.message}}</div><div matsnackbaractions>{{data.action}}</div></div>',
  styles: [
    `
    .normal-message {
      color: lightblue;
    }

    .error-message {
      color: red;
    }

    .error-notif {
      color: red;
      background-color: red;
      width: 500px;
    }
  `,
  ],
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule],
})
export class ColorizedSnackBar {
  message: string = '';
  message_type: string = 'normal';
  snackBarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: '', style: '', action: '' }) { }
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _snackBar: MatSnackBar) { }

  showMessage(m: string, error: boolean = false, sticky: boolean = false) {

    let data = { message: m!, style: (error ? 'error' : 'normal'), action: 'fermer' };

    let snackBarRef = this._snackBar.open(m!, (error ? 'OK' : ''), { duration: (sticky ? 15000 : (error ? 5000 : 2500)), horizontalPosition: 'center', verticalPosition: 'bottom', panelClass: 'error-notif' });
  }

}
