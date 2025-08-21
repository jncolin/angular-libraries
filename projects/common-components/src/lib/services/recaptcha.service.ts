import { Inject, Injectable } from '@angular/core';
import { LIB_RECAPTCHA_KEY } from '../lib-config';
declare var grecaptcha: any;

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {
  constructor(@Inject(LIB_RECAPTCHA_KEY) private siteKey: string) {
  }
 
  execute(action: string): Promise<string> {
    return new Promise((resolve, reject) => {
      grecaptcha.enterprise.ready(() => {
        grecaptcha.enterprise.execute(this.siteKey, { action })
          .then((token: string) => {
          resolve(token);
        }).catch((error: any) => {
          reject(error);
        });
      });
    });
  }
}
