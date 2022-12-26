import { useStyles } from "./styles";
import { Play, Pause } from "react-feather";
import { useMusic } from "@services/music-player/hooks";
import { SongControls } from "../song-controls";
import { AudioControls } from "../audio-controls";


export const MusicPlayer = () => {
    const classes = useStyles();
    const { controls, state } = useMusic();

    if (!state.activeSong) return null;

    return (
        <div className={classes.musicPlayer}>
            <div className={classes.info}>
                <div className={classes.thumbnail}>

                </div>
                <div className={classes.songInfo}>
                    <p className={classes.songTitle}>
                        {
                            state.activeSong.title
                        }
                    </p>
                    <p className={classes.songArtist}>
                        {
                            state.activeSong.artist
                        }
                    </p>
                </div>
            </div>

           <SongControls />

           <AudioControls />
        </div>
    )
};