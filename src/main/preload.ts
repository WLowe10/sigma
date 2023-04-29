// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { IpcKeys } from '@global/constants';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const songsService = {
  async getSongInfo(url: string) {
    return await ipcRenderer.invoke(IpcKeys.SONG_INFO, {
      url
    })
  },

  getSongs() {
    return ipcRenderer.invoke(IpcKeys.GET_SONGS)
  },
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

const rpcService = {
  setListening(song: string) {
    ipcRenderer.send(IpcKeys.RPC_SONG, song);
  }
};

const appService = {
  minimize() {
    ipcRenderer.send(IpcKeys.MINIMIZE_WINDOW);
  },
  maximize() {
    ipcRenderer.send(IpcKeys.MAXIMIZE_WINDOW);
  },
  exit() {
    ipcRenderer.send(IpcKeys.EXIT);
  },
  async getVersion() {
    return await ipcRenderer.invoke(IpcKeys.APP_GET_VERSION);
  }
}

contextBridge.exposeInMainWorld('electron', {
  settingsService,
  songsService,
  rpcService,
  appService
});

export type ElectronHandler = {
  settingsService: typeof settingsService,
  songsService: typeof songsService,
  rpcService: typeof rpcService,
  appService: typeof appService,
}

