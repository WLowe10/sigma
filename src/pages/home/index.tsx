import { PageWrapper, Song } from "@global/components";
import { useStyles } from "./styles";
import { Home as HomeIcon, Search, Book } from "react-feather";
import { useMusic } from "@services/music-player/hooks";
import { useSongs } from "@services/songs/hooks";

export const Home = () => {
    const classes = useStyles();
    const { songs } = useSongs();

    return (
       <PageWrapper className={classes.homeContainer}>
            <div className={classes.songContainer}>
                {
                    songs && songs.map((song, index) => <Song song={song} key={index}/>)
                }
            </div>
       </PageWrapper>
    )
};