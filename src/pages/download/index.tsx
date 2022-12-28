import { PageWrapper } from "@global/components";
import { SongDownloader } from "@services/song-downloader";
import { useRef, useState } from "react";
import { useStyles } from "./styles";
import { toast } from "react-toastify";

export const Download = () => {
    const classes = useStyles();
    const songDownloader = useRef(new SongDownloader());
    const [urlValue, setUrlValue] = useState("");

    const downloadHandler = async () => {
        // if (!songDownloader.current.validate(urlValue)) {
        //     return toast.error("A valid YouTube url is required")
        // };
        
       songDownloader.current.download("https://www.youtube.com/watch?v=kvO_nHnvPtQ")
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