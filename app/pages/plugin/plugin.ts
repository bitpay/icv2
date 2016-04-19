import { Page } from 'ionic-angular';
import { PluginManager } from '../../components/components';
import { RootNavigationProvider } from '../../providers/providers';

@Page({
  directives: [PluginManager],
  templateUrl: 'build/pages/plugin/plugin.html',
})
export class PluginPage {
  navbar: HTMLElement;
  constructor(private rootNav: RootNavigationProvider) {}
  onPageWillEnter() {
    this.navbar = <HTMLElement>document.getElementsByTagName("ion-navbar-section")[0];
    this.navbar.style.display = 'none';
  }
  onPageDidLeave() {
    this.navbar.style.display = 'block';
    this.rootNav.closePlugin();
  }
}
