import { Page } from 'ionic-angular';
import { Activity } from 'icv2-plugin-client';
import { TimeAgoPipe } from 'angular2-moment';
import { ProfileSettingsPage } from './profile-settings/profile-settings';
import { RootNavigationProvider, ActivityProvider, ProfileProvider } from '../../providers/providers';
import { PluginInstance } from '../../components/components';

@Page({
  templateUrl: 'build/pages/activity/activity.html',
  pipes: [TimeAgoPipe]
})
export class ActivityPage {
  notifications = this.activityProvider.notifications;
  activity = this.activityProvider.activity;
  notificationCount: number;
  showSearch: boolean;
  currentPluginInstances: PluginInstance[];
  constructor(
    public rootNav: RootNavigationProvider,
    public activityProvider: ActivityProvider,
    public profileProvider: ProfileProvider) {
    this.showSearch = false;
    this.notifications.subscribe((notifications)=>{
      this.notificationCount = notifications.length;
    });
    this.profileProvider.currentProfile.subscribe((profile)=>{
      this.currentPluginInstances = profile.pluginInstances;
    });
  }
  // ngOnInit(){
  //   this.settings();
  // }
  settings(){
    this.rootNav.getRootNav().push(ProfileSettingsPage);
  }
  search(){
    this.showSearch = !this.showSearch;
  }
  getPluginInstanceName(activityId){
    var id = activityId.split('/')[0];
    for(var i = 0; i < this.currentPluginInstances.length; i++){
      if(id === this.currentPluginInstances[i].derivationPath.pluginId){
        return this.currentPluginInstances[i].name;
      }
    }
  }
}
