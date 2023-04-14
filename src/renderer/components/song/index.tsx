import { Clock } from "react-feather";
import { useMusic } from "@renderer/services/music-player/hooks";
import { useEffect, useState } from "react";
import { useAudioDuration } from "@renderer/hooks";
import { motion } from "framer-motion"  
import type { SongType } from "@renderer/types";
import { Button, Card, Text, Image, CardHeader, CardBody } from "@chakra-ui/react";

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
        <Card onClick={selectSong} _hover={{
            cursor: "pointer"
        }}>
            {/* <Image src={`./songs/thumbnails/${song.id}.png`} /> */}
            <CardBody>
                <Image 
                    src={"https://i.ytimg.com/vi/aelpqWEBHR4/maxresdefault.jpg"} 
                    rounded={"lg"}
                    objectFit={"cover"}
                    height={175}
                    width={175}
                />
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
            </CardBody>
        </Card>
    )
};