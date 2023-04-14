import { useStyles } from "./styles";
import { Clock } from "react-feather";
import { Theme } from "@global/constants/theme";
import { useMusic } from "@services/music-player/hooks";
import { useEffect, useState } from "react";
import { useAudioDuration } from "@global/hooks";
import { motion } from "framer-motion"  
import type { SongType } from "@global/types";

type Props = {
    song: SongType
};

const variants = {
    hidden: {
        opacity: 0,
        height: 0,
        scale: 0,
        transition: {
            type: "spring",
            duration: .25
        }
    },
    showing: {
        opacity: 1,
        height: "auto",
       scale: 1,
        transition: {
            type: "spring",
            duration: .25
        }

    }
}

export const Song = ({ song }: Props) => {
    const classes = useStyles();
    const { id } = song;
    const { controls, state } = useMusic();
    const { duration } = useAudioDuration(`./songs/audio/${id}.mp3`)

    const selectSong = () => {
        controls.setSong(id);
    };

    return (
        <motion.button className={classes.song} onClick={selectSong} exit={variants.hidden} animate={variants.showing} initial={variants.hidden}>
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

            <p className={classes.songText}>
                {
                    duration ? duration : "-"
                }
            </p>
        </motion.button>
    )
};