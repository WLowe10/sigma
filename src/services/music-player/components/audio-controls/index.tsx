import { useStyles } from "./styles";
import { Play, Pause, SkipForward, SkipBack } from "react-feather";

export const AudioControls = () => {
    const classes = useStyles();

    return (
        <div className={classes.audioControls}>
            {/* () => state.playing ? controls.pause() : controls.play() */}
                <button onClick={() => {}}>
                    {/* {
                        state.playing ? <Pause/> : <Play />
                    } */}
                  
                </button>
            </div>
    )
};