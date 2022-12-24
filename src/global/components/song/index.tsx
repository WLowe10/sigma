import { useStyles } from "./styles";
import { Clock } from "react-feather";
import { Theme } from "@global/constants/theme";

import { useMusic } from "@services/music-player/hooks";

export const Song = () => {
    const classes = useStyles();
    const { controls, state } = useMusic();

    return (
        <div className={classes.song}>
            <button className={classes.thumbnail} onClick={() => controls.setSong("5")}>

            </button>

            <p className={classes.songText}>
                Title
            </p>

            <p className={classes.songText}>
                Date
            </p>

            <Clock color={Theme.fontColors.secondary}/>
        </div>
    )
};