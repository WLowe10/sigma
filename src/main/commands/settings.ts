import { ipcMain } from "electron";
import { IpcKeys } from "../../global/constants";
import type ElectronStore from "electron-store";

export const createSettingsCommands = (store: ElectronStore) => {
    ipcMain.handle(IpcKeys.STORE_SET, (event: any, key: string, value: any) => {
        return store.set(key, value);
    });

    ipcMain.handle(IpcKeys.STORE_GET, (event: any, key: string) => {
        return store.get(key);
    });
};