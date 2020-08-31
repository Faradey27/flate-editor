export type PluginName = 'state' | 'camera' | 'zoom';

export interface Plugin {
  getName: () => PluginName;
  run: () => Plugin;
  release: () => void;
}
