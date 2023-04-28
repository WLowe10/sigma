import { app, ipcMain } from "electron";
import { IpcKeys } from "../../global/constants";
import type { BrowserWindow } from "electron"

export const createMainControls = (window: BrowserWindow) => {
    ipcMain.handle(IpcKeys.APP_GET_VERSION, () => {
        return app.getVersion()
    });

    ipcMain.on(IpcKeys.MINIMIZE_WINDOW, () => {
        window.minimize();
    });

    ipcMain.on(IpcKeys.MAXIMIZE_WINDOW, () => {
        window.maximize();
    });

    ipcMain.on(IpcKeys.EXIT, () => {
        window.close();
    });
};