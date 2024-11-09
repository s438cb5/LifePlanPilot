export {};

export interface Versions {
  electron: string;
  chrome: string;
  node: string;
}

declare global {
  interface Window {
    api: {
      getVersions: () => Promise<Versions>;
    };
  }
}
