export class AudioManager {
    private audio: HTMLAudioElement;

    constructor() {
        this.audio = new Audio();
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