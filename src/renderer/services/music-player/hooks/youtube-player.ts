import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { getYoutubeId, sleep } from "@global/utils";
import { useTempElement } from "@renderer/hooks";
import youtubePlayer from "youtube-player";
import type { YouTubePlayer } from "youtube-player/dist/types";

type Props = {
    options?: {
        defaultVolume?: number
    },
    events?: {
        onEnd?: (play: (url: string) => void) => any,
    },
}

export const useYoutubePlayer = (props?: Props) => {
    const [playing, setPlaying] = useState<boolean>(false);
    const [looping, setLooping] = useState<boolean>(false);
    const [buffering, setBuffering] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(props?.options?.defaultVolume || 100);
    const [muted, setMuted] = useState<boolean>(false);
    const [activeSong, setActiveSong] = useState<string | null>(null);
    const [duration, setDuration] = useState<number>(0);
    const [time, setTime] = useState<number>(0);
    const player = useRef<YouTubePlayer | null>(null);
    const loopingRef = useRef(false);
    const tempElementId = useTempElement("div");

    //hook callbacks
    const onEndRef = useRef(props?.events?.onEnd);

    const handleLoadSong = (url: string) => {
        if (!player.current) return;

        const videoId = getYoutubeId(url);
        player.current.loadVideoById(videoId);
        player.current.pauseVideo();

        setActiveSong(url);
        setDuration(0);
        setTime(0);
        setPlaying(false);
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

        player.current.unMute();
        player.current.setVolume(volume);

        setMuted(false);
        setVolume(volume);
    };

    const handleSetLoop = (shouldLoop: boolean) => {
        if (!player.current) return;

        player.current.setLoop(shouldLoop);
        loopingRef.current = shouldLoop;
        setLooping(shouldLoop);
    };

    const handleToggleLoop = () => {
        if (!player.current) return;

        const nextLoop = !looping;

        loopingRef.current = nextLoop;
        setLooping(nextLoop);
    };

    const handleSetMute = (shouldMute: boolean) => {
        if (!player.current) return;

        if (shouldMute) {
            player.current.mute();
            setMuted(true);
        } else {
            player.current.unMute();
            setMuted(false);
        }
    };

    const handleSeek = (to: number) => {
        if (!player.current) return;
       
        const destination = (duration * to) / 100;
        player.current.seekTo(destination, true);
    }

    const handleToggleMute = () => {
        if (!player.current) return;

        if (!muted) {
            player.current.mute();
            setMuted(true);
        } else {
            player.current.unMute();
            setMuted(false);
        }
    };

    const createPlayer = () => {
        const ytPlayer = youtubePlayer(tempElementId, {
            playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
            },
        });

        ytPlayer.setPlaybackQuality("small");

        player.current = ytPlayer;
        return ytPlayer;
    };

    useEffect(() => {
        if (!playing) return;

        const durInterval = setInterval(() => {
            if (!player.current) return;

            player.current.getDuration().then(length => {
                if (!length) return;

                setDuration(length);
                clearInterval(durInterval);
            });
        }, 100)

        const timeInterval = setInterval(async () => {
            if (!player.current) return;

            const time = await player.current.getCurrentTime(); 
            setTime(time);
        }, 100);

        return () => {
            clearInterval(durInterval);
            clearInterval(timeInterval);
        };
    }, [playing, activeSong])

    useEffect(() => {
        onEndRef.current = props?.events?.onEnd;
    }, [props?.events])

    useEffect(() => {
        const ytPlayer = player.current || createPlayer();

        const handleState = (event: any) => {
            const handleVideoEnded = () => {
                if (loopingRef.current) return ytPlayer.playVideo();
                if (typeof onEndRef.current == "function") {
                    return onEndRef.current((url) => {
                        if (!url) return setPlaying(false);

                        handleLoadSong(url)
                        handlePlaySong();
                    });
                }

                return setPlaying(false);
            };

            const stateMap: Record<string, () => void> = {
                "0": handleVideoEnded,
                // "3": handleVideoBuffering,
            };

            const handler = stateMap[event.data.toString()];

            if (typeof handler == "function") {
                handler();
            };
        }

        ytPlayer.on("stateChange", handleState);

        if (props?.options?.defaultVolume) {
            ytPlayer.setVolume(props.options.defaultVolume);
        };

        return () => {
            if (player.current) {
                player.current.removeEventListener("stateChange", handleState);
            };
        };
    }, []);

    return {
        state: {
            playing: playing,
            volume: volume,
            looping: looping,
            muted: muted,
            buffering: buffering,
            duration: duration,
            time: time,
            progress: (time == 0 || duration == 0) ? (0) : ((time / duration) * 100),
        },
        controls: {
            load: handleLoadSong,
            play: handlePlaySong,
            pause: handlePauseSong,
            setVolume: handleVolume,
            toggleMute: handleToggleMute,
            setMute: handleSetMute,
            setLoop: handleSetLoop,
            seek: handleSeek,
            toggleLoop: handleToggleLoop
        }
    }
}