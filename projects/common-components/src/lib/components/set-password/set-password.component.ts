import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthnService } from '../../services/authn.service';
import { MessageService } from '../../services/message.service';


export function checkPasswordMatch(field1: string, field2: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control) {
      return null;
    }
    const f1 = control.get(field1);
    const f2 = control.get(field2);
    if ((!f1) || (!f2)) return null;
    if (f1.value !== f2.value) {
      f2.setErrors({ dontMatch: true })
      return { dontMatch: true };
    }
    return null;
  }
}

@Component({
  selector: 'app-set-password',
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
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css', '../../styles.css']

})
export class SetPasswordComponent implements OnInit, OnDestroy {
  private _resetToken: string | null = null;
  setPasswordForm: FormGroup;
  message = '';

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private authnService: AuthnService, private messageService: MessageService) {
    this.setPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(12)]],
      check: ['', [Validators.required, Validators.minLength(12)]],
    }, {
      validators: checkPasswordMatch('password', 'check')
    });
  }

  ngOnInit(): void {
    this._resetToken = this.route.snapshot.queryParamMap.get('resettoken');
    this.authnService.signOut();
  };

  ngOnDestroy(): void {
    // console.debug('destroying SetPassword');
  }

  resetForm() {
    this.setPasswordForm.reset();
  }

  save() {
    if (this.setPasswordForm.valid && !this.authnService.isAuthenticated && this._resetToken) {
      // this is the password set/reset case
      // if token is set, session should never be authenticated
      this.authnService.setPassword(this._resetToken, this.setPasswordForm.controls['password'].value!).subscribe({
        next: (data) => {
          this.messageService.showMessage('Password has been updated');
          this.setPasswordForm.reset();
          this.authnService.signOut();
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          console.error('Error updating password', true);
          this.messageService.showMessage('Error updating password');
          this.authnService.signOut();
          this.router.navigateByUrl('/login');
        }
      })
    } else {
      console.error('save password not authenticated', this.authnService.isAuthenticated);
      this.messageService.showMessage('Error trying to update the password', true);
    }
  }

  canDeactivate(): boolean | Observable<boolean> {
    let goOn = true;
    goOn = confirm('Do you confirm you want to leave this page? Token may no longer be valid');
    if (goOn) {
      this.setPasswordForm.reset();
    }
    return goOn;
  }
}
