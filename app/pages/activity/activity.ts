import { Page, Events, NavPush, NavController } from 'ionic-angular';
import { Activity, DateRange } from 'icv2-plugin-client';
import { TimeAgoPipe } from 'angular2-moment';
import { ProfileSettingsPage } from '../profile-settings/profile-settings';

@Page({
  templateUrl: 'build/pages/activity/activity.html',
  pipes: [TimeAgoPipe]
})
export class ActivityPage {

  events: Events;
  notifications: Activity[] = [];
  activity: Activity[] = [];
  nav: NavController;

  constructor(events: Events, nav: NavController) {
    this.events = events;
    console.log('ActivityPage constructor called.');
    this.listenForActivityResponses();
    this.activityPageReady();
    this.nav = nav;
  }

  // ngOnInit(){
  //   this.settings();
  // }

  settings(){
    this.nav.push(ProfileSettingsPage);
  }

  activityPageReady(){
    // get activity since last requested
    var end = Date.now();
    // just get last 2 days (for demo)
    var begin = end - 1000 * 60 * 60 * 24 * 2;
    var range = new DateRange(new Date(begin), new Date(end));
    this.events.publish('activity:requests', range);
  }

  listenForActivityResponses() {
    this.events.subscribe('activity:responses', (array: Activity[]) => {
      array.forEach((activity)=> {
        if(activity.notification === true){
          this.notifications.push(activity);
        } else {
          this.activity.push(activity);
        }
      });
    });
  }
}
