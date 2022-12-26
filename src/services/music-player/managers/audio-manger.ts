export class AudioManager {
    private audio: HTMLAudioElement;

    constructor() {
        this.audio = new Audio();
        this.audio.src = "./12345.mp3"
    };

    play() {
        this.audio.play();
    };

    pause() {
        this.audio.pause();
    };

    toggleLoop() {
        this.audio.loop = !this.audio.loop;
    };

    setSource(path: string) {
        this.audio.src = path;
    };

    setVolume(level: number) {
        this.audio.volume = level;
    };
}