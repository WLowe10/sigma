import { PageWrapper, Song } from "@global/components";
import { useStyles } from "./styles";
import { Home as HomeIcon, Search, Book } from "react-feather";
import { useMusic } from "@services/music-player/hooks";

import { SongDownloader } from "@services/song-downloader";

export const Home = () => {
    const classes = useStyles();

    const dl = new SongDownloader("https://www.youtube.com/watch?v=uld8gM7e3WU");

   // dl.download();

    return (
       <PageWrapper className={classes.homeContainer}>
            <div className={classes.songContainer}>
                <Song />
            </div>
       </PageWrapper>
    )
};