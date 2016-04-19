import { Injectable } from 'angular2/core';
import { Activity } from 'icv2-plugin-client';
import { DataStore, Version, MigrationState } from '../models';
import { Storage } from 'ionic-angular';
import { MigrationsStorage } from './stores';

@Injectable()
export class ActivityStorage extends DataStore {
  constructor(
    storage: Promise<Storage>,
    collection: string,
    migrations: MigrationsStorage
  ){
    super(storage, collection, [
          // initialize store
          (state: MigrationState)=>{
            // data and metadata are optional, though we simplify our db by avoiding
            // NULL values. When these values are not provided, they are stored as ''
            // (empty string). Likewise, notification and deeplink are set to 0 (false)
            // if not otherwise specified.
            return state.storage.query(`
              CREATE TABLE ${this.collection} (
                id            TEXT PRIMARY KEY,
                timestamp     INTEGER NOT NULL,
                description   TEXT NOT NULL,
                data          TEXT NOT NULL,
                metadata      TEXT NOT NULL,
                deeplink      BIT NOT NULL,
                notification  BIT NOT NULL
              );`).then((data)=>{
                console.log(`ActivityStorage create '${this.collection}' table query returned:`);
                console.log(data);
                return state;
              });
          }
    ], migrations);
  }

  getLatest(count: number): Promise<Activity[]>{
    return this.ready().then((storage)=>{
      return storage.query(`SELECT * FROM ${this.collection} ORDER BY timestamp DESC limit ${count}`).then((data)=>{
        var activity: Activity[] = [];
        for(var i = 0; i < data.res.rows.length; i++){
          activity.push(new Activity(data.res.rows[i]));
        }
        return activity;
      });
    });
  }

  saveActivity(activity: Activity[]){
    return this.ready().then((storage)=>{
      var query = `INSERT OR REPLACE INTO ${this.collection} (id, timestamp, description, data, metadata, deeplink, notification) VALUES `;
      activity.forEach((item)=>{
        query += `('${item.id}', ${item.timestamp.getTime()}, '${item.description}', '${item.data || ''}', '${item.metadata || ''}', ${item.deeplink? 1: 0}, ${item.notification? 1: 0}),`;
      });
      query = query.replace(/,$/, ';');
      // console.log('Inserting activity with query: ' + query);
      storage.query(query).then((data)=>{
        return true;
      }, (error)=>{
        console.error(`Failed to save activity to the '${this.collection}' collection.`);
        console.error(error);
        return false;
      });
    });
  }

}
