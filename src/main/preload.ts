// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { IpcKeys } from '@global/constants';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const songsService = {
  async addSong(url: string) {
    return await ipcRenderer.invoke(IpcKeys.SONG_ADD, {
      url
    })
  },

  deleteSong(idArr: Array<string>) {
    return ipcRenderer.invoke(IpcKeys.SONG_DELETE, idArr);
  },

  getSongs() {
    return ipcRenderer.invoke(IpcKeys.GET_SONGS)
  },

  playSong(url: string) {
    ipcRenderer.send(IpcKeys.PLAY_SONG, url);
  },

  on(channel: IpcKeys.SONG_STREAM, func: (...args: any) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: any) => func(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  }
};

const playlistsService = {
  // async createPlaylist(name: string) {
  //   return await ipcRenderer.invoke(IpcKeys.SONG_ADD, name);
  // },

  // deleteSong(idArr: Array<string>) {
  //   return ipcRenderer.invoke(IpcKeys.SONG_DELETE, idArr);
  // },

  // getSongs() {
  //   return ipcRenderer.invoke(IpcKeys.GET_SONGS)
  // },

  // playSong(url: string) {
  //   ipcRenderer.send(IpcKeys.PLAY_SONG, url);
  // },

  // on(channel: IpcKeys.SONG_STREAM, func: (...args: any) => void) {
  //   const subscription = (_event: IpcRendererEvent, ...args: any) => func(...args);
  //   ipcRenderer.on(channel, subscription);

  //   return () => {
  //     ipcRenderer.removeListener(channel, subscription);
  //   };
  // }
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

