import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { AuthnService } from '../../services/authn.service';
import { LIB_RECAPTCHA_KEY } from '../../lib-config';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reset-password',
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
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css', '../../styles.css']
})

export class ResetPasswordComponent implements OnInit, OnDestroy {
  private _captchaToken: string | undefined = undefined;
  private singleExecutionSubscription?: Subscription;
  resetPasswordForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private authnService: AuthnService,
    private messageService: MessageService, @Inject(LIB_RECAPTCHA_KEY) private siteKey: string) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    }, {});
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.singleExecutionSubscription) {
      this.singleExecutionSubscription.unsubscribe();
    }
  }

  resetForm() {
    this.resetPasswordForm.reset();
    this.router.navigate(['/login']);
  }

  send() {
    if (this.resetPasswordForm.valid) {
      if (this.singleExecutionSubscription) {
        this.singleExecutionSubscription.unsubscribe();
      }
      this.authnService.requestPasswordReset(this.resetPasswordForm.controls['email'].value!, this._captchaToken).subscribe({
        next: () => {
          this.messageService.showMessage('Message has been sent.');
          this.router.navigate(['/bienvenue']);
        },
        error: (error) => {
          console.log(error);
          this.messageService.showMessage('An error occurred', true);
          this.router.navigate(['/login']);
        }
      })
    }
  }

  resolved(captchaResponse: string) {
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
    this._captchaToken = captchaResponse;
  }
}
