import { useState, useEffect } from "react";
import { getAudioDuration, convertSeconds } from "@renderer/utils";

export const useAudioDuration = (src: string) => {
    const [duration, setDuration] = useState<string | null>(null);
    const [durationInSecs, setDurationInSecs] = useState<number | null>(null);

    const getDuration = async () => {
        let dur = await getAudioDuration(src);
        setDuration(convertSeconds(dur));
        setDurationInSecs(dur);
    };

    useEffect(() => {
        getDuration();
    }, [src])

    return {
        duration,
        durationInSecs
    }
}