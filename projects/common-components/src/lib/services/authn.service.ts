import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode, InvalidTokenError, JwtPayload } from 'jwt-decode';
import { LIB_API_URL, LIB_LOGIN_URL } from '../lib-config';
import { Router } from '@angular/router';

export const JWT_TOKEN_NAME = 'r_api_token';

type CustomJwtPayload = JwtPayload & { id: string, username: string, email: string, roles: string[] };

@Injectable({
  providedIn: 'root'
})
export class AuthnService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private _authenticated: boolean = false;
  private _verifiedToken: CustomJwtPayload | null = null;
  private _token: string | null = null;

  constructor(private http: HttpClient, @Inject(LIB_API_URL) private endpoint: string,
    @Inject(LIB_LOGIN_URL) private loginEndpoint: string, private router: Router) { }

  signOut(redirect: boolean = true): void {
    console.debug('signing out');
    localStorage.removeItem(JWT_TOKEN_NAME);
    this._authenticated = false;
    this._verifiedToken = null;
    this._token = null;
    if (redirect)
      this.router.navigate([this.loginEndpoint]);
  }

  set token(t: string | null) {
    this._token = t;
    if (t) {
      try {
        const vt = jwtDecode<CustomJwtPayload>(t);
        this._verifiedToken = vt;
        this._authenticated = true;
        localStorage.setItem(JWT_TOKEN_NAME, t);
      } catch (e) {
        if (e instanceof InvalidTokenError) {
          console.error('error decoding token: ', t, e.message);
          this.signOut();
        }
      }
    } else {
      this.signOut();
    }
  }

  get isAuthenticated() {
    if (this._verifiedToken) {
      // Only consider valid tokens
      if ((this._verifiedToken.exp) && (this._verifiedToken.exp >= Math.floor(Date.now() / 1000))) {
        return this._authenticated;
      } else {
        console.log('forcing signout');
        this.signOut(false);
        return this._authenticated;
      }
    } else {
      return this._authenticated;
    }
  }

  get id() {
    if (this._verifiedToken)
      return parseInt(this._verifiedToken.id);
    else
      return null;
  }

  get username() {
    if (this._verifiedToken)
      return this._verifiedToken.username;
    else
      return null;
  }


  get roles() {
    if (this._verifiedToken) {
      return this._verifiedToken.roles;
    } else
      return null;
  }

  get email() {
    if (this._verifiedToken)
      return this._verifiedToken.email;
    else
      return null;
  }

  get token() {
    return this._token;
  }

  get exp() {
    if (this._verifiedToken)
      return this._verifiedToken.exp;
    else
      return null;
  }

  /**
   * checks if a valid token is stored in local storage
   * @returns true if a valid token is stored in localstorage, false otherwise
   */

  loadToken(): boolean {
    const t = localStorage.getItem(JWT_TOKEN_NAME);
    if (t) {
      try {
        const vt = jwtDecode<CustomJwtPayload>(t);
        if (vt.exp && vt.exp > Math.floor(Date.now() / 1000)) {
          // Token still valid
          this._token = t;
          this._verifiedToken = vt;
          this._authenticated = true;
          return true;
        }
      } catch (e) {
        if (e instanceof InvalidTokenError) {
          console.error('error decoding token: ', t, e.message);
          this._token = null;
          this._verifiedToken = null
          this._authenticated = false;
          localStorage.removeItem(JWT_TOKEN_NAME);
        }
      }
    }
    return false;
  }

  signIn(username: string | null, password: string | null): Observable<any> {
    const headers = { 'Content-Type': 'application/json', 'withCredentials': true };
    let loginTime = new Date();
    return this.http.post<any>(`${this.endpoint}/auth/signin`, { username: username, password: password, logintime: `@user local time ${loginTime.toLocaleString()} Z time ${loginTime.toISOString()}` }, headers);
  }

  setPassword(token: string, password: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>(`${this.endpoint}/auth/setpassword`, { token: token, password: password }, { headers });
  }

  requestPasswordReset(email: string, captcha_token: string | undefined): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>(`${this.endpoint}/auth/resetpassword`, { email: email, token: captcha_token }, { headers });
  }

  refreshToken() {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>(`${this.endpoint}/auth/refreshtoken`, {}, { headers });
  }


}
