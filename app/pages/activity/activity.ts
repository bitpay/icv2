import { Page, Events } from 'ionic-angular';
import { Activity, DateRange } from 'icv2-plugin-client/events';

@Page({
  templateUrl: 'build/pages/activity/activity.html',
})
export class ActivityPage {

  events: Events;
  notifications: Activity[] = [];
  activity: Activity[] = [];

  constructor(events: Events) {
    this.events = events;
    console.log('ActivityPage constructor called.');
    this.listenForActivityResponses();
    this.activityPageReady();
  }

  activityPageReady(){
    // get activity since last requested
    var end = Date.now();
    // just get last 2 days (for demo)
    var begin = end - 1000 * 60 * 60 * 24 * 2;
    var range = new DateRange(new Date(begin), new Date(end));
    console.log('ActivityPage sent request for activity dateRange – begin: ' + range.begin + ' end: ' + range.end);
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
