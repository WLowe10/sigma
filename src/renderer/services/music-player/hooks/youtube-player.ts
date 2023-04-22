import { useEffect, useMemo, useState, useRef } from "react";
import { getYoutubeId } from "@global/utils";
import { useTempElement } from "@renderer/hooks";
import youtubePlayer from "youtube-player";
import type { YouTubePlayer } from "youtube-player/dist/types";

export const useYoutubePlayer = () => {
    const [playing, setPlaying] = useState<boolean>(false);
    const [looping, setLooping] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(100);
    const player = useRef<YouTubePlayer | null>(null);
    const tempElementId = useTempElement("div");

    const handleLoadSong = (url: string) => {
        if (!player.current) return;

        const videoId = getYoutubeId(url);
        player.current.loadVideoById(videoId);
        player.current.pauseVideo();
    };

    const handlePlaySong = () => {
        if (!player.current) return;

        player.current.playVideo();
        setPlaying(true);
    };

    const handlePauseSong = () => {
        if (!player.current) return;

        player.current.pauseVideo();
        setPlaying(false);
    };

    const handleVolume = async (volume: number) => {
        if (!player.current) return;

        player.current.setVolume(volume);
        setVolume(volume);
    };

    const handleSetLoop = (shouldLoop: boolean) => {
        if (!player.current) return;

        player.current.setLoop(shouldLoop);
        setLooping(shouldLoop);
    };

    const handleToggleLoop = () => {
        if (!player.current) return;

        const nextLoop = !looping;

        player.current.setLoop(nextLoop);
        setLooping(nextLoop);
    };

    useEffect(() => {
        const ytPlayer = youtubePlayer(tempElementId, {
            playerVars: {
                autoplay: 0,
                controls: 0
            },
            // events: {

            // }
        });

        ytPlayer.on("stateChange", (event) => {
            if (event.data == 0) {
                setPlaying(false);

                // console.log(looping)
                // if (looping) {
                    // player.current && player.current.playVideo();
                //     console.log("loop")
                // }
            }
        })

        player.current = ytPlayer;
    }, []);

    return {
        state: {
            playing: playing,
            volume: volume,
            looping: looping
        },
        controls: {
            load: handleLoadSong,
            play: handlePlaySong,
            pause: handlePauseSong,
            setVolume: handleVolume,
            setLoop: handleSetLoop,
            toggleLoop: handleToggleLoop
        }
    }
}