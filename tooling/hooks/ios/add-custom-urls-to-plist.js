'use strict';

var fs    = require('fs');
var plist = require('plist');

var FILEPATH = 'platforms/ios/icv2/icv2-Info.plist';

var xml = fs.readFileSync(FILEPATH, 'utf8');
var obj = plist.parse(xml);

obj.CFBundleURLTypes = [
  {
      CFBundleURLSchemes: [
          'copay',
          'bitcoin',
          'bitauth'
      ]
  },
];

xml = plist.build(obj);
fs.writeFileSync(FILEPATH, xml, { encoding: 'utf8' });
console.log('custom uri schemes written to plist');
