import { StatePlugin } from './statePlugin';
import { Plugin } from './types.d';
import { ZoomPlugin } from './zoom';

export type PluginName = 'state' | 'camera' | 'zoom';

type PluginInstance = StatePlugin | ZoomPlugin | Plugin;

export type PluginType<T> = T extends 'state'
  ? StatePlugin
  : T extends 'zoom'
  ? ZoomPlugin
  : never;

export type UsePlugin = <T extends PluginName>(type: T) => PluginType<T>;

export const createPluginsBindings = (plugins: PluginInstance[]) => {
  const usePlugin: UsePlugin = <T extends PluginName>(name: T) => {
    return plugins.find((plugin) => plugin.getName() === name) as PluginType<T>;
  };

  return { usePlugin };
};
