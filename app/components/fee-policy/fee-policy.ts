import { Component } from 'angular2/core';

@Component({
  selector: 'fee-policy',
  inputs: ['policy'],
  templateUrl: 'build/components/fee-policy/fee-policy.html'
})

export class FeePolicy {
  policy: BitcoinNetworkFeePolicy;
  policies = BitcoinNetworkFeePolicy;
}

export enum BitcoinNetworkFeePolicy {
  Priority,
  Normal,
  Economy
}
