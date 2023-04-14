// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { IpcKeys } from '@global/constants';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const songsService = {
  async downloadSong(url: string) {
    return await ipcRenderer.invoke(IpcKeys.SONGS_DOWNLOAD, {
      url
    })
  }
};

const settingsService = {
  async get(key: string) {
    return await ipcRenderer.invoke("STORE_GET", key) 
  },

  async set(key: string, value: any) {
    return await ipcRenderer.invoke("STORE_SET", key, value) 
  }
};

contextBridge.exposeInMainWorld('electron', {
  settingsService,
  songsService
});

export type ElectronHandler = {
  settingsService: typeof settingsService,
  songsService: typeof songsService
}

