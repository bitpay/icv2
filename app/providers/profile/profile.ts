import {Injectable, bind} from 'angular2/core';
import {Subject, BehaviorSubject} from 'rxjs';
import { Profile, Seed, ProfileConfiguration } from './models';

@Injectable()
export class ProfileProvider {

  // initialize with sample profile
  currentProfile = new BehaviorSubject<Profile>(new Profile('Satoshi', new Seed().issueSeedPosition()));

  public switchCurrentProfile(newProfile: Profile){
    this.currentProfile.next(newProfile);
  }
}

export { Profile, Seed, ProfileConfiguration };
