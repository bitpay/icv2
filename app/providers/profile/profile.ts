import { Injectable, Inject, forwardRef } from 'angular2/core';
import { Subject, ReplaySubject } from 'rxjs';
import { Profile, Seed, ProfileConfiguration } from './models';
import { PluginInstance, Plugin } from '../../components/components';
import { PersistentStorageProvider } from '../providers';

@Injectable()
export class ProfileProvider {
  currentProfile: ReplaySubject<Profile> = new ReplaySubject(1);

  public switchCurrentProfile(newProfile: Profile){
    this.currentProfile.next(newProfile);
  }
  constructor(
    @Inject(forwardRef(() => PersistentStorageProvider))
    private storage: PersistentStorageProvider
  ){
    storage.kv.get('sampleProfile').then((sampleProfile)=>{
      if(typeof sampleProfile === 'undefined'){
        console.log('No sampleProfile in kv. Generating...');
        sampleProfile = new Profile('Satoshi', new Seed().issueSeedPosition());
        var samplePlugin1 = new Plugin('Simple Wallet', 'starter', 'T2cbQLTFMXRnSzktFkuoG3eHoMeFtpTu3S');
        var samplePlugin2 = new Plugin('Multisignature Wallet', 'starter', 'TQ2TWHE3GMdB6BZKafqwxXtWAWgFt5Jvm3');
        var samplePlugin3 = new Plugin('Colored Assets', 'starter', 'TPSSGeFHDnKNxiEyFrD1wcEaHr9hrQDDWc');
        var sampleInstance1 = new PluginInstance('Business Expenses', samplePlugin1);
        sampleInstance1.status = '1,213,028 bits';
        var sampleInstance2 = new PluginInstance('Company Funds', samplePlugin2);
        sampleInstance2.status = '61.103 BTC';
        var sampleInstance3 = new PluginInstance('Business Assets (2 of 3)', samplePlugin3);
        sampleInstance3.status = '~$15,251.80 USD';
        sampleProfile.pluginInstances = [
          sampleInstance1,
          sampleInstance2,
          sampleInstance3
        ];
      }
      this.switchCurrentProfile(sampleProfile);
    });
  }
}

export { Profile, Seed, ProfileConfiguration };
