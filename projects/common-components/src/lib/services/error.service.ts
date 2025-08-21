import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _error: string = '';
  constructor() { }

  set error(errorMessage: string) {
    this._error = errorMessage;
  }

  get error() {
    return this._error;
  }
}
