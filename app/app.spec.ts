import { it } from 'angular2/testing';
import { NgZone } from 'angular2/core';
import { Platform, IonicApp, Config, ClickBlock } from 'ionic-angular';
import { MyApp } from './app';
import { RootNavigationProvider } from './providers/providers';

describe('App', () => {

  let myApp;

  beforeEach(() => {
    let ionicApp = new IonicApp(
      new Config(),
      new ClickBlock(),
      new NgZone({enableLongStackTrace: true})
    );
    let platform = new Platform();
    let rootNav = new RootNavigationProvider();
    myApp = new MyApp(ionicApp, platform, rootNav);
  });

  it('should initialize the app', () => {
    expect(myApp).not.toBeNull();
  });

});
