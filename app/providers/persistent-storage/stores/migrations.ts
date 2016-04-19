import { Injectable } from 'angular2/core';
import { DataStore, Version, MigrationState } from '../models';
import { Storage } from 'ionic-angular';

@Injectable()
export class MigrationsStorage extends DataStore {
  constructor(
  storage: Promise<Storage>,
  collection: string){
    super(storage, collection, [
          // initialize store
          (state: MigrationState)=>{
            return state.storage.query(`
              CREATE TABLE ${collection} (
                id            INTEGER PRIMARY KEY AUTOINCREMENT,
                collection    TEXT NOT NULL,
                timestamp     INTEGER NOT NULL,
                fromVersion   INTEGER NOT NULL,
                toVersion     INTEGER NOT NULL
              );`).then((data)=>{
                console.log(`MigrationsStorage create '${this.collection}' table query returned:`);
                console.log(data);
                return state;
              });
          }
    ], null);
  }

  runMigrations(
  storage: Storage,
  collection: string,
  migrations: ((state: MigrationState) => Promise<MigrationState>)[],
  migrationsStorage: MigrationsStorage){
    console.log(`Using self for MigrationsStorage collection: ${collection}`);
    return super.runMigrations(storage, collection, migrations, this);
  }

  getCollectionVersion(collection: string): Promise<Version>{
    return this._storage.then((storage) => {
      let query = `SELECT MAX(toVersion) AS version FROM ${this.collection} WHERE collection='${collection}';`;
      return storage.query(query).then((data)=>{
        return new Version(data.res.rows[0]['version']);
      }, (error) => {
        // migrations table doesn't exist,
        // return version 0
        return new Version(0);
      });
    })
  }

  logMigration(collection: string, state: MigrationState): Promise<MigrationState>{
    return this._storage.then((storage)=>{
      let query = `INSERT INTO ${this.collection} (collection, timestamp, fromVersion, toVersion)
                      VALUES ('${collection}', ${state.timestamp.getTime()}, ${state.currentVersion}, ${state.migratingTo});`;
      return storage.query(query).then((data)=>{
        console.log(data);
        return state;
      }, (error)=>{
        console.error(error);
      });
    })
  }

}
