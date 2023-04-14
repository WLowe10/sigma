import { useEffect, useState, useRef } from "react";
import { useMusic } from "@renderer/services/music-player/hooks";
import { VolumeX, Volume } from "react-feather";
import { Slider } from "@chakra-ui/react";

export const AudioControls = () => {
    const [vol, setVol] = useState(50);
    const [muted, setMuted] = useState(false);
    const lastVolumeLevel = useRef(50);
    const { controls } = useMusic();

    useEffect(() => {
        controls.setVolume(vol / 100)

        if (!vol) {
            setMuted(true);
        } else {
            setMuted(false)
        };
    }, [vol])

    const toggleMuted = () => {
        if (muted) {
            setVol(lastVolumeLevel.current);
            setMuted(false);
        } else {
            lastVolumeLevel.current = vol;
            setMuted(true);
            setVol(0)
        }
    };

    return (
        <div>
            {
                // muted ? <VolumeX onClick={toggleMuted} color={Theme.fontColors.secondary}/> :  <Volume onClick={toggleMuted} color={Theme.fontColors.secondary}/>
            }
            <Slider
                value={vol}
                defaultValue={50}
                style={{maxWidth: "10rem"}}
                // trackStyle={{backgroundColor: Theme.fontColors.primary}}
                // railStyle={{backgroundColor: Theme.dark2}}
                // handleStyle={{backgroundColor: Theme.fontColors.primary, opacity: 1, border: "none"}}
                onChange={(value: any) => setVol(value)}
            />
        </div>
    )
};