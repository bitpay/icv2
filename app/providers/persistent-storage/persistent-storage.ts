import { Injectable, Inject, forwardRef } from 'angular2/core';
import { Observable } from 'rxjs';
import { Platform, Storage, SqlStorage } from 'ionic-angular';
import { ActivityStorage, KvStorage, MigrationsStorage } from './stores/stores';

@Injectable()
export class PersistentStorageProvider {

  private _storage: Promise<Storage>;
  migrations: MigrationsStorage;
  activity: ActivityStorage;
  kv: KvStorage;

  constructor(private platform: Platform) {
     let storage = this.platform.ready().then(() => {
      console.log('Platform ready, initializing storage in PersistentStorageProvider.');
      let options = {
        name: '__icv2storage',
        backupFlag: SqlStorage.BACKUP_LOCAL
      };
      return new Storage(SqlStorage, options);
    });
    let migrations = new MigrationsStorage(storage, 'migrations');
    this.activity = new ActivityStorage(storage, 'activity', migrations);
    this.kv = new KvStorage(storage, 'kv', migrations);
    this._storage = storage;
  }

}
