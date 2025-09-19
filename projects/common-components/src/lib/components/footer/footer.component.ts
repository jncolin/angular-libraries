import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() leftFooterText: string = '© CLEPA 2025';
  @Input() rightFooterText: string = '';
}
