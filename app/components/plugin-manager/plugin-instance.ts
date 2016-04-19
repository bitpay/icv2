export class PluginInstance {
  private: boolean;
  archived: boolean;
  derivationPath: DerivationPath;
  status: string;
  constructor(public name: string, public plugin: Plugin){
    this.derivationPath = plugin.issueDerivationPath();
  }
}

export class DerivationPath {
  // the pluginId of the plugin at the time the instance private key was derived
  pluginId: string;
  constructor(public plugin: Plugin, public index: number){
    this.pluginId = plugin.pluginId;
  }
  toString(){
    return this.pluginId + ':' + this.index;
  }
}

export class Plugin {
  derivationPaths: DerivationPath[];
  constructor(public name: string, public path: string, public pluginId: string){
    this.derivationPaths = [];
  }
  issueDerivationPath(){
    var nextIndex = this.derivationPaths.length;
    var derivationPath = new DerivationPath(this, nextIndex);
    this.derivationPaths.push(derivationPath);
    return derivationPath;
  }
}
