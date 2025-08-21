import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SpinnerService } from '../../services/spinner.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'lib-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css',],
  imports: [NgIf, AsyncPipe,],

  standalone: true
})
export class SpinnerComponent {
  constructor(public spinnerService: SpinnerService) { }
}
