import {Injectable, bind} from 'angular2/core';
import {Subject, Observable} from 'rxjs';
import { Activity } from 'icv2-plugin-client';

@Injectable()
export class ActivityProvider {
  newActivity: Subject<Activity> = new Subject<Activity>();

  addActivity(activity: Activity){
    this.newActivity.next(activity);
  }

  newNotifications(): Observable<Activity> {
    return this.newActivity.filter((activity: Activity) => {
      return activity.notification;
    });
  }
}
