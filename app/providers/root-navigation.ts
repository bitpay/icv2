import { Injectable } from 'angular2/core';
import { Nav } from 'ionic-angular';

@Injectable()
export class RootNavigationProvider {
  rootNavigation: Nav;
  public setRootNav(nav: Nav){
    this.rootNavigation = nav;
  }
  public getRootNav(){
    return this.rootNavigation;
  }
}
