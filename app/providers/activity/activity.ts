import { Injectable, Inject, forwardRef } from 'angular2/core';
import { Subject, Observable } from 'rxjs';
import { Activity } from 'icv2-plugin-client';
import { PersistentStorageProvider } from '../providers';

@Injectable()
export class ActivityProvider {
  newActivity: Subject<Activity[]> = new Subject();

  notifications: Subject<Activity[]> = new Subject();
  activity: Subject<Activity[]> = new Subject();

  constructor(
    @Inject(forwardRef(() => PersistentStorageProvider))
    private storage: PersistentStorageProvider
  ){
    let pastActivity = storage.activity.getLatest(100);
    let allActivity = Observable.fromPromise(pastActivity)
      .scan((acc, currentValue)=>{
        return acc.concat(currentValue).sort((a,b)=>{
          return b.timestamp.valueOf() - a.timestamp.valueOf();
        });
      }, <Activity[]>[]);

    allActivity.subscribe((items)=> {
      var notifications: Activity[] = [];
      var activity: Activity[] = [];
      items.forEach((item)=>{
        item.notification? notifications.push(item) : activity.push(item);
      });
      this.notifications.next(notifications);
      this.activity.next(activity);
    });
  }

  public saveActivity(activity: Activity[]){
    this.newActivity.next(activity);
    return this.storage.activity.saveActivity(activity);
  }

}
