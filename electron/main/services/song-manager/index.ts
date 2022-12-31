import fs from "fs";

type SongType = {
    title: string,
    artist: string,
    date: string,
    url: string
};

type SongsStorage = {
    songs: [
        SongType
    ]
};

class SongManager {
    private readonly recordPath = "./songs/songs.json";

    constructor() {
        //?initialize storage location if non-existent
    };

    public async checkObstruction(url: string) {
        const songReconds = await this.readJSON();
        const songExists = songReconds.songs.find(song => song.url == url);

        return songExists ? true : false;
    }

    public async downloadSong() {

    };

    public async storeSongRecord(newSong: SongType) {
        let newData = await this.readJSON()

        newData.songs.push(newSong);
        this.writeJSON(newData);
    };

    private async readJSON() {
        const data = await fs.readFileSync("./songs/songs.json", "utf8");
        const jsonData = JSON.parse(data) as SongsStorage;

        return jsonData;
    };

    private async writeJSON(data: any) {
        return await fs.writeFileSync(this.recordPath, JSON.stringify(data))
    };
}

export const songManager = new SongManager();
