import { useStyles } from "./styles";
import Slider from 'rc-slider';
import { useMusic } from "@services/music-player/hooks";
import { Theme } from "@global/constants/theme";

export const AudioControls = () => {
    const classes = useStyles();
    const { controls } = useMusic();

    return (
        <div className={classes.audioControls}>
            <Slider 
                defaultValue={50}
                trackStyle={{backgroundColor: Theme.fontColors.primary}}
                railStyle={{backgroundColor: Theme.fontColors.secondary}}
                handleStyle={{backgroundColor: Theme.fontColors.primary, opacity: 1, border: "none"}}
                onChange={(value: any) => {
                    controls.setVolume(value / 100)
                }}
            />
        </div>
    )
};