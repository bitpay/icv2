'use strict';

var fs    = require('fs');
var plist = require('plist');

var FILEPATH = 'platforms/ios/icv2/icv2-Info.plist';

var xml = fs.readFileSync(FILEPATH, 'utf8');
var obj = plist.parse(xml);

obj.UIStatusBarHidden = true;
obj.UIViewControllerBasedStatusBarAppearance = false;

xml = plist.build(obj);
fs.writeFileSync(FILEPATH, xml, { encoding: 'utf8' });
console.log('UIStatusBarHidden written to plist');
