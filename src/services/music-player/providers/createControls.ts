import { AudioManager } from "../managers";

export const createControls = (audioManager: AudioManager) => ({
    play() {
        audioManager.play();
    },
    pause() {
        audioManager.pause();
    }
})