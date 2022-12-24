import { useStyles } from "./styles";
import { Play, Pause } from "react-feather";
import { useMusic } from "@services/music-player/hooks";


export const MusicPlayer = () => {
    const classes = useStyles();
    const { controls, state } = useMusic();

    if (!state.activeSong) return null;

    return (
        <div className={classes.musicPlayer}>
            <div className={classes.controls}>
                <p>
                    {
                        state.activeSong.title
                    }
                </p>
                <button onClick={() => state.playing ? controls.pause() : controls.play()}>
                    {
                        state.playing ? <Pause/> : <Play />
                    }
                </button>
            </div>
        </div>
    )
};