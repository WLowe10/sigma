import { useStyles } from "./styles";
import { Clock } from "react-feather";
import { Theme } from "@global/constants/theme";
import { useMusic } from "@services/music-player/hooks";
import type { SongType } from "@global/types";

type Props = {
    song: SongType
};

export const Song = ({ song }: Props) => {
    const classes = useStyles();
    const { controls, state } = useMusic();

    return (
        <div className={classes.song}>
            <img className={classes.thumbnail} src={`./songs/thumbnails/${song.id}.png`} />

            <p className={classes.songText}>
                {
                    song.artist
                }
            </p>

            <p className={classes.songText}>
                {
                    song.title
                }
            </p>

            <p className={classes.songText}>
                {
                    song.date
                }
            </p>

            <Clock color={Theme.fontColors.secondary}/>
        </div>
    )
};