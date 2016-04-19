import { Injectable } from 'angular2/core';
import { DataStore } from '../models';
import { Storage } from 'ionic-angular';
import { MigrationsStorage } from './stores';

@Injectable()
export class KvStorage extends DataStore {
  constructor(
    storage: Promise<Storage>,
    collection: string,
    migrations: MigrationsStorage
  ){
    super(storage, collection, null, migrations);
  }

  get(key: string) {
    return this._storage.then((storage) => {
      return storage.get(key);
    });
  }

  set(key: string, value: any) {
    return this._storage.then((storage) => {
      return storage.set(key, value);
    });
  }

  query(query: string){
    return this._storage.then((storage) => {
      return storage.query(query);
    })
  }

}
