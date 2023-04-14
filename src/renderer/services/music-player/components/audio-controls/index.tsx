import { useEffect, useState, useRef } from "react";
import { useStyles } from "./styles";
import Slider from 'rc-slider';
import { useMusic } from "@services/music-player/hooks";
import { Theme } from "@global/constants/theme";
import { VolumeX, Volume } from "react-feather";

export const AudioControls = () => {
    const [vol, setVol] = useState(50);
    const [muted, setMuted] = useState(false);
    const lastVolumeLevel = useRef(50);
    const { controls } = useMusic();
    const classes = useStyles();

    useEffect(() => {
        controls.setVolume(vol / 100)

        if (!vol) {
            setMuted(true);
        } else {
            setMuted(false)
        };
    }, [vol])

    const toggleMuted = () => {
        if (muted) {
            setVol(lastVolumeLevel.current);
            setMuted(false);
        } else {
            lastVolumeLevel.current = vol;
            setMuted(true);
            setVol(0)
        }
    };

    return (
        <div className={classes.audioControls}>
            {
                muted ? <VolumeX onClick={toggleMuted} color={Theme.fontColors.secondary}/> :  <Volume onClick={toggleMuted} color={Theme.fontColors.secondary}/>
            }
            <Slider
                value={vol}
                defaultValue={50}
                style={{maxWidth: "10rem"}}
                trackStyle={{backgroundColor: Theme.fontColors.primary}}
                railStyle={{backgroundColor: Theme.dark2}}
                handleStyle={{backgroundColor: Theme.fontColors.primary, opacity: 1, border: "none"}}
                onChange={(value: any) => setVol(value)}
            />
        </div>
    )
};