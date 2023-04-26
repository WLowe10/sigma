import { ipcMain } from "electron";
import { IpcKeys, Discord } from "../../global/constants";
import RPC from "discord-rpc";

const client = new RPC.Client({transport: "ipc"});
client.login({ clientId: Discord.applicatonId }).catch();

export const createRPCCommands = () => {
    const startTime = Date.now();

    client.on("ready", () => {
        client.setActivity({
            details: "What is that melody?",
            state: `Idle`,
            largeImageKey: 'sigma512',
            smallImageKey: 'sigma512',
            largeImageText: 'Sigma',
            smallImageText: 'Sigma',
            startTimestamp: startTime,
            instance: false,
        });

        ipcMain.on(IpcKeys.RPC_SONG, async (event: any, song: string) => {
            client.setActivity({
                details: "What is that melody?",
                state: song ? `Listening to ${song}` : "Idle",
                largeImageKey: 'sigma512',
                smallImageKey: 'sigma512',
                largeImageText: 'Sigma',
                smallImageText: 'Sigma',
                startTimestamp: startTime,
                instance: false,
            })
        });
    });
};