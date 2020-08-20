export interface Plugin {
  getName: () => Plugins;
  run: () => Plugin;
  release: () => void;
}
