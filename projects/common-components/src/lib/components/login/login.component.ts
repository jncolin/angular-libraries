import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthnService } from '../../services/authn.service';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LIB_RESET_PASSWORD_URL } from '../../lib-config';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../styles.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  message: string = '';

  constructor(private formBuilder: FormBuilder, public authnService: AuthnService, public router: Router,
    private route: ActivatedRoute, private messageService: MessageService, 
    @Inject(LIB_RESET_PASSWORD_URL) public resetPasswordUrl: string) {
    this.message = this.getMessage();
    this.loginForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    // console.debug('destroying loginComponent');
  }

  login() {
    if (this.loginForm.valid) {
      this.message = 'Authenticating...';
      this.authnService.signIn(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
        .subscribe({
          next: (v) => {
            this.authnService.token = v.token;
            this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/admin');
            this.message = 'You are now connected';
            this.messageService.showMessage(this.message, false);
          },
          error: e => {
            console.error('error', e.error);
            this.authnService.signOut();
            this.message = e.error.message || "Server connection failure";
            this.messageService.showMessage(this.message, true);
            // stay on login page if failure
          }
        });
    }
  }

  resetForm() {
    this.loginForm.reset();
    this.message = this.getMessage();
    this.router.navigate(['/login',]);
  }

  getMessage() {
    return ((this.authnService.isAuthenticated) ? 'You are connected' : 'You are currently disconnected');
  }
}