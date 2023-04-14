class AudioManager {
    public audio: HTMLAudioElement;
    private timeEvent: any;

    constructor() {
        this.audio = new Audio();
    };

    public play() {
        this.audio.play();
    };

    public pause() {
        this.audio.pause();
    };

    public toggleLoop() {
        this.audio.loop = !this.audio.loop;
    };

    public setSource(path: string) {
        this.audio.src = path;
    };

    public setVolume(level: number) {
        this.audio.volume = level;
    };

    public registerTimeEvent(cb: any) {
        this.timeEvent = cb;
        this.audio.addEventListener("timeupdate", (this.timeEvent));

        // this.audio.addEventListener("timeupdate", (event) => {
        //     event.ti
        // });

    };

    public clearTimeEvent() {
        this.audio.removeEventListener("timeupdate", (this.timeEvent))
    }

    public timeTravel() {
       
    };
}

export const audioManager = new AudioManager();