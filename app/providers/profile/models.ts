import { Activity } from 'icv2-plugin-client';
import { PluginInstance, BitcoinNetworkFeePolicy } from '../../components';

export class Profile {
  configuration: ProfileConfiguration;
  activity: Activity[];
  pluginInstances: PluginInstance[];
  constructor(public name: string, root: SeedPosition){
    this.configuration = new ProfileConfiguration();
    this.activity = [];
    this.pluginInstances = [];
  }
}

export class ProfileConfiguration {
  exchanges: Exchange[];
  addressBook: AddressBook;

  // notification settings
  notificationEmailAddress: string;
  emailNotificationsEnabled: boolean;
  pushNotificationsEnabled: boolean;

  // display preferences
  language: Language;
  displayUnit: BitcoinDisplayUnit;
  valueEstimationCurrency: Currency;
  feePolicy: BitcoinNetworkFeePolicy;

  // security & privacy
  pinCode: number;
  password: string;
  touchIdEnabled: boolean;
  bwsUrl: string;

  constructor(){
    // set defaults
    this.emailNotificationsEnabled = false;
    this.pushNotificationsEnabled = false;

    this.language = new Language('EN', 'English');
    this.displayUnit = new BitcoinDisplayUnit('bits', 100);
    this.valueEstimationCurrency = new Currency('USD');
    this.feePolicy = BitcoinNetworkFeePolicy.Normal;

    this.touchIdEnabled = false;
    this.bwsUrl = 'https://bws.bitpay.com/bws/api';
  }
}

class Language {
  code: string;
  localizedName: string;
  constructor(code: string, localizedName: string){
    this.code = code;
    this.localizedName = localizedName;
  }
  toString(){
    return this.localizedName;
  }
}

class Currency {
  code: string;
  constructor(code: string){
    this.code = code;
  }
  toString(){
    return this.code;
  }
}

class BitcoinDisplayUnit {
  suffix: string;
  satoshis: number;
  constructor(suffix: string, satoshis: number){
    this.suffix = suffix;
    this.satoshis = satoshis;
  }
  toString(){
    return this.suffix;
  }
}

class Exchange {
  PluginInstance: PluginInstance;
}

class AddressBook {
  entries: AddressBookEntry[];
}

class AddressBookEntry {
  label: string;
  data: string;
}

class SeedPosition {
  seed: Seed;
  index: number;
  constructor(seed: Seed, index: number){
    this.seed = seed;
    this.index = index;
  }
}

export class Seed {
  entropy: number;
  seedPositions: SeedPosition[];
  constructor(){
    this.entropy = Math.random();
    this.seedPositions = [];
  }
  issueSeedPosition(){
    var nextIndex = this.seedPositions.length;
    var seedPosition = new SeedPosition(this, nextIndex);
    this.seedPositions.push(seedPosition);
    return seedPosition;
  }
}
