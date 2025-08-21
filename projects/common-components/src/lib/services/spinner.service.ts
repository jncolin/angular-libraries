import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  visibility: BehaviorSubject<boolean>;

  constructor() {
    this.visibility = new BehaviorSubject(false);
  }
  
  show() {
    //console.log('show spinner');
    this.visibility.next(true);
  }

  hide() {
    //console.log('hide spinner');
    this.visibility.next(false);
  }

}
