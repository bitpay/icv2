import { Page } from 'ionic-angular';
import { PluginManager } from '../../components/components';

@Page({
  directives: [PluginManager],
  templateUrl: 'build/pages/plugin/plugin.html',
})
export class PluginPage {
  constructor() {

  }
}
