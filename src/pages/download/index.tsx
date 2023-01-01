import { PageWrapper } from "@global/components";
import { useRef, useState } from "react";
import { useStyles } from "./styles";
import { toast } from "react-toastify";
import { useSongs } from "@services/songs/hooks";

export const Download = () => {
    const { controls } = useSongs();
    const classes = useStyles();
    const [urlValue, setUrlValue] = useState("");

    const downloadHandler = async () => {   
        const song = await controls.downloadSong(urlValue);
        toast.success(`Downloaded Song: ${song.title}`)
    };

    return (
       <PageWrapper className={classes.downloadContainer}>
           <div className={classes.interactionContainer}>
                <h1>
                    Download a song from YouTube
                </h1>
                <input value={urlValue} onChange={(e) => setUrlValue(e.target.value)} placeholder={'https://www.youtube.com/watch?v=gzIH7vytjEE'}/>
                <button onClick={downloadHandler}>
                    Download
                </button>
           </div>
       </PageWrapper>
    )
};