import { useState } from "react";
import { useStyles } from "./styles";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from "react-feather";
import { Theme } from "@global/constants/theme";
import { useMusic } from "@services/music-player/hooks";
import { useEffect } from "react";
import { useAudioDuration } from "@global/hooks";
import Slider from "rc-slider";
import { audioManager } from "@services/music-player/managers"; 
import { convertSeconds } from "@global/utils";

export const SongControls = () => {
    const classes = useStyles();
    const { controls, state } = useMusic();
    const activeSongId = state.activeSong?.id;
    const { duration, durationInSecs } = useAudioDuration(`./songs/audio/${activeSongId}.mp3`);
    const [progress, setProgress] = useState(0);
    const [formattedProgress, setFormattedProgress] = useState<string>("0:00");

    // todo add ability to drag slider

    useEffect(() => {
        if (!durationInSecs) return;
        setProgress(0)

        const interval = setInterval(() => {
            //!should access this through context
            const timeStamp = audioManager.audio.currentTime;       
            setProgress((timeStamp / durationInSecs) * 100)
            setFormattedProgress(convertSeconds(Math.floor(timeStamp)))
        }, 100)

        return () => {
            clearInterval(interval)
        }
    }, [duration])

    return (
        <div className={classes.songControls}>
            <div className={classes.row}>
                <button className={classes.controlButton}>
                    <Repeat color={state.details.loop ? Theme.accents.blue : Theme.fontColors.secondary} size={20} onClick={() => controls.toggleLoop()}/>
                </button>

                <button className={classes.controlButton}>
                    <SkipBack color={Theme.fontColors.secondary} size={20}/>
                </button>

                <button className={classes.mainButton} onClick={() => state.details.playing ? controls.pause() : controls.play()}>
                    {
                        state.details.playing? <Pause size={20}/> : <Play size={20}/>
                    }
                </button>

                <button className={classes.controlButton}>
                    <SkipForward color={Theme.fontColors.secondary} size={20}/>
                </button>

                <button className={classes.controlButton}>
                    <Shuffle color={Theme.fontColors.secondary} size={20}/>
                </button>
            </div>

            <div className={classes.row}>
                <p className={classes.durationText}>
                    {
                        formattedProgress
                    }
                </p>

                <Slider 
                    value={progress}
                    defaultValue={0}
                    trackStyle={{backgroundColor: Theme.fontColors.primary}}
                    railStyle={{backgroundColor: Theme.dark2}}
                    handleStyle={{backgroundColor: Theme.fontColors.primary, opacity: 1, border: "none"}}
                />

                <p className={classes.durationText}>
                    {
                        duration
                    }
                </p>
            </div>
                
        </div>
    )
};