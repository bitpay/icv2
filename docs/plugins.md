# Icv2 Plugins

Most of Icv2 is powered by plugins – secure, self-contained applications which add functionality to icv2.

Icv2 plugins run in tightly-controlled containers, and are only able to access resources with user permission. This enables icv2 to be safely extended by developers.

## Getting Started

The Icv2 repo includes several `packaged-plugins` which are built into the published app. The `starter` plugin is intended to demonstrate the functionality of the plugin API and help new developers get off the ground quickly.

To get started, simple clone the Icv2 repo, and begin editing the plugin in `packaged-plugins/starter`. The `npm start` command will also make the `starter` plugin available in the app.

## Icv2 Plugin Architecture

Like the app, Icv2 plugins are built with standard web technologies (HTML, CSS, and Javascript) – code can be written once and run on all platforms.

Particularly for the Icv2 ecosystem, this serves an important security function: with more consumers, critical code is more stable, better code-reviewed, and more thoroughly tested. This network effect improves security for all users, and significantly boosts security of less popular platforms.

### Plugin Sandboxing

All Icv2 plugins run inside "sandboxes", containers which prevent them from accessing or modifying Icv2's source code or data. Plugins must connect to the Internet, receive data, and perform other permissioned operations through Icv2's Plugin API.

This layer of security reduces the potential impact of bugs and malicious code, while providing users with the control and flexibility to safely try new plugins.

### Plugin User Interface

Icv2 plugins run in a restricted `iframe` HTML element, and communicate with Icv2 via a `PostMessage` API. This allows plugins to provide a complete, interactive user-interface. The built-in `P2PKH` and `P2SH` wallets are plugins, for example.

Plugins developers are free to develop unique and complex interfaces within the plugin's iframe view, and can provide a further enhanced experience with various hooks into Icv2's notification, activity, and other systems.

### Communicating with Icv2

Plugin's communicate with Icv2 via an RPC-like, `PostMessage`-based Plugin API. A Javascript/Typescript wrapper-library, `Icv2PluginClient`, makes interacting with the Icv2 Plugin API simple.

# Icv2 Plugin API

## Getting Permissions

## Making Web Requests

- whitelisted request proxy

## Storing &amp; Retrieving Data

- searchable data, deeplinks

## Registering URIs

- camera
- OS-level intents/URI following
- payment codes/receive addresses

## Getting Private Keys

- getMasterPrivateKey()
- deriving all keys from plugin's assigned, hardened HD key (making plugin keys recoverable from backup)

## Requesting Funds

# Icv2 Plugin Client API Reference

The Icv2 Plugin Client API is designed to be intuitive, well-namespaced, and easily typechecked.

#### `icv2.close()`

#### `icv2.openURI(uri: string) => Promise<boolean>`

## Instance

#### `icv2.instance.setName(name: string) => Promise<boolean>`

#### `icv2.instance.setStatus(status: string) => Promise<boolean>`

#### `icv2.instance.setNextBitcoinAddress(address: string) => Promise<boolean>`
- used by receive view
- QR code uses this if another QRString isn't set

#### `icv2.instance.setQRString(string: string) => Promise<boolean>`
- for plugins wanting to their QR code for non-bitcoin address data

#### `icv2.instance.getInstallParams() => Promise<Object>`

Instance install params can be set by installing a plugin instance from a deeplink URI, where the `p` parameter is a JSON object of install params, eg: `icv2://install?id=T2cbQLTFMXRnSzktFkuoG3eHoMeFtpTu3S&p={"join":"TQ2TWHE3GMdB6BZKafqwxXtWAWgFt5Jvm3"}`

Which would return:
```
{
  "join": "TQ2TWHE3GMdB6BZKafqwxXtWAWgFt5Jvm3"
}
```

<!-- #### icv2.instance.getQRString() -->

#### `icv2.instance.getMasterPrivateKey()`

## Activity

#### `icv2.activity.push(activity: Activity[])`

When transfering funds between plugins, the sending plugin should provide the activity.

#### `icv2.activity.getLatest(count: number)`

#### `icv2.activity.getPeriod(from: Date, to: Date)`

## Storage

#### `icv2.storage.get(key: string)`

#### `icv2.storage.set(key: string, value: any)`

## Scanner

#### `icv2.scanner.registerURI()`

#### `icv2.scanner.registerPattern()`

## Deep Linking

#### `icv2.deeplink.setHandler()`

## Capabilities

#### `icv2.capabilities.getAll()`


## BWS

#### `icv2.bws.monitorAddresses()`

#### `icv2.bws.unmonitorAddresses()`


## Bitcore?

#### icv2.bitcore. [...]
