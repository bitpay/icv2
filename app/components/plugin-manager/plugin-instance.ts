export class PluginInstance {
  private: boolean;
  archived: boolean;
  derivationPath: DerivationPath;
  pluginId: string;
}

export class DerivationPath {
  pluginId: string;
  index: number;
}
