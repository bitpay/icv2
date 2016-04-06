import { Injectable } from 'angular2/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TabsProvider {
  currentState = new BehaviorSubject<boolean>(true);
  public showTabs(){
    this.currentState.next(true);
  }
  public hideTabs(){
    this.currentState.next(false);
  }
}
