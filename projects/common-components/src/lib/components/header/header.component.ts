import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() logoSrc: string = '';
  @Input() title: string = '';
}
