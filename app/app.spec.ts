import { it } from 'angular2/testing';
import { Platform, Events } from 'ionic-angular';
import { MyApp } from './app';

describe('App', () => {

  let myApp;

  beforeEach(() => {
    let platform = new Platform();
    let events = new Events();
    myApp = new MyApp(platform, events);
  });

  it('should initialize the app', () => {
    let myApp = new MyApp(new Platform(), new Events());
    expect(myApp).not.toBeNull();
  });

});
