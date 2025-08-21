import { Component, OnInit } from '@angular/core';
import { AuthnService } from '../../services/authn.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'lib-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css','../../styles.css']
})
export class ErrorComponent implements OnInit {
  constructor(private authnService: AuthnService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.authnService.signOut();
  }

  get message() {
    return this.errorService.error || 'No message';
  }
}
