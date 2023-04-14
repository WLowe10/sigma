import { Clock } from "react-feather";
import { useMusic } from "@renderer/services/music-player/hooks";
import { useEffect, useState } from "react";
import { useAudioDuration } from "@renderer/global/hooks";
import { motion } from "framer-motion"  
import type { SongType } from "@renderer/global/types";
import { Button, Card, Text } from "@chakra-ui/react";

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
    const { id } = song;
    const { controls, state } = useMusic();
    // const { duration } = useAudioDuration(`./songs/audio/${id}.mp3`)

    const selectSong = () => {
        controls.setSong(id);
    };

    return (
        <Card onClick={selectSong}>
            {/* <Image src={`./songs/thumbnails/${song.id}.png`} /> */}

            <Text>
                {
                    song.artist
                }
            </Text>
            <Text>
                {
                    song.title
                }
            </Text>
            <Text>
                {
                    song.date
                }
            </Text>
            <Text>
                {
                    // duration ? duration : "-"
                }
            </Text>
        </Card>
    )
};