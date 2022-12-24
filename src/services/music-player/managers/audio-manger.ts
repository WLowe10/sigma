export class AudioManager {
    private audio: HTMLAudioElement;

    constructor() {
        this.audio = new Audio();
        this.audio.src = "./song.mp3"

        this.audio.volume = .25;
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

    setVolumeLevel(level: number) {
        this.audio.volume = level;
    };
}