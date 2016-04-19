import { Storage } from 'ionic-angular';
import { MigrationsStorage } from './stores/stores';

export class DataStore {
  private _readyPromise: Promise<Storage>;
  private _readyResolve: Function;

  constructor(
    protected _storage: Promise<Storage>,
    public collection: string,
    private _migrations: ((state: MigrationState) => Promise<MigrationState>)[],
    migrationsStorage: MigrationsStorage
  ){
    this._readyPromise = new Promise(res => { this._readyResolve = res; } );
    if(_migrations !== null){
      _storage.then((storage)=>{
        return this.runMigrations(storage, collection, _migrations, migrationsStorage);
      });
    }
  }

  version(migrations){
    return migrations.length;
  }

  ready() {
    return this._readyPromise;
  }

  runMigrations(
  storage: Storage,
  collection: string,
  migrations: ((state: MigrationState) => Promise<MigrationState>)[],
  migrationsStorage: MigrationsStorage){
    console.log('Running migrations for collection: ' + collection);
    return migrationsStorage
      .getCollectionVersion(collection).then(
        (version) => {
          var currentVersion = version.current;
          var migratingTo = this.version(migrations);
          if(currentVersion < migratingTo){
            console.log('Beginning collection: \'' + collection + '\' migration to version: ' + migratingTo);
            migrations.reduce((chain, next, index) => {
              return chain.then((state) => {
                state.currentVersion = new Version(index);
                state.migratingTo = new Version(index + 1);
                state.timestamp = new Date();
                return Promise.resolve(state).then(next).then(
                  (state) => {
                    // migration successful
                    return migrationsStorage.logMigration(collection, state);
                  },
                  (error) => {
                    // migration failed
                    console.error(`Migration for collection: '${collection}' failed while migrating from: '${new Version(index - 1)}' to: '${new Version(index)}`);
                    console.error(error);
                  }
                );
              });
            }, Promise.resolve(new MigrationState(storage))).then((state)=>{
              // migrations successful
              console.log(`Finished all migrations for collection: '${collection}'. Migrated to: '${state.migratingTo}'.`);
            }, (error) => {
              //migrations failed
              console.log(`Migrations failed for collection: '${collection}'.`);
              console.error(error);
            });
          } else {
            console.log('Collection: \'' + collection + '\' is at the latest version: ' + currentVersion);
          }
          this._storage.then((storage)=>{
            this._readyResolve(storage);
          });
    });
  }
}

export class Version {
  constructor(public current: number){}
  toString(){
    return this.current;
  }
}

export class MigrationState {
  currentVersion: Version;
  migratingTo: Version;
  timestamp: Date;
  constructor(public storage: Storage){}
}
