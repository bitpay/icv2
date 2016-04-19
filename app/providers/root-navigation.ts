import { Injectable } from 'angular2/core';
import { Nav, Tabs } from 'ionic-angular';
import { PluginInstance } from '../components/components';

@Injectable()
export class RootNavigationProvider {
  private rootNavigation: Nav;
  private tabs: Tabs;
  private pluginTabIndex: number;

  private lastPluginElem: HTMLElement;
  private lastTabIndex: number;

  public setRootNav(nav: Nav){
    this.rootNavigation = nav;
  }
  public setTabs(tabs: Tabs){
    this.tabs = tabs;
  }
  public setPluginTabIndex(index: number){
    this.pluginTabIndex = index;
  }
  public openPlugin(plugin: PluginInstance){
    this.lastTabIndex = this.tabs.getSelected().index;
    this.lastPluginElem = <HTMLElement>document.getElementById(plugin.derivationPath.toString());
    this.lastPluginElem.style.display = 'block';
    this.tabs.select(this.pluginTabIndex);
  }
  public closePlugin(){
    this.lastPluginElem.style.display = 'none';
  }
  public reselectTab(){
    this.tabs.select(this.lastTabIndex);
  }
  public getRootNav(){
    return this.rootNavigation;
  }
  constructor(){
  }
}
