import { useStyles } from "./styles";
import { useMusic } from "@services/music-player/hooks";
import { SongControls } from "../song-controls";
import { AudioControls } from "../audio-controls";
import { motion, AnimatePresence} from "framer-motion";

const variants = {
    open: {
        marginBottom: 0,
        transition: {
            type: "spring",
            duration: .25,
        }
    },
    closed: {
        marginBottom: -100,
        transition: {
            type: "spring",
            duration: .25,
        }
    }
}

export const MusicPlayer = () => {
    const classes = useStyles();
    const { controls, state } = useMusic();

    return (
        <AnimatePresence>
            {
                state.activeSong && <motion.div className={classes.musicPlayer} animate={variants.open}  initial={variants.closed} exit={variants.closed}>
                <div className={classes.info}>
                    <img className={classes.thumbnail} src={`./songs/thumbnails/${state.activeSong.id}.png`} />
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
            </motion.div>
            }
        
        </AnimatePresence>
    )
};