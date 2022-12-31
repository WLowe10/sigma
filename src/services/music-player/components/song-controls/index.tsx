import { useStyles } from "./styles";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from "react-feather";
import { Theme } from "@global/constants/theme";
import { useMusic } from "@services/music-player/hooks";


export const SongControls = () => {
    const classes = useStyles();
    const { controls, state } = useMusic();

    return (
        <div className={classes.songControls}>
            {/*  */}
                <button className={classes.controlButton}>
                    <Repeat color={Theme.fontColors.secondary}/>
                </button>

                <button className={classes.controlButton}>
                    <SkipBack color={Theme.fontColors.secondary}/>
                </button>

                <button className={classes.mainButton} onClick={() => state.playing ? controls.pause() : controls.play()}>
                    {
                        state.playing ? <Pause/> : <Play />
                    }
                </button>

                <button className={classes.controlButton}>
                    <SkipForward color={Theme.fontColors.secondary} />
                </button>

                <button className={classes.controlButton}>
                    <Shuffle color={Theme.fontColors.secondary}/>
                </button>
            </div>
    )
};