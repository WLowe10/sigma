import { useEffect, useState } from "react";
import { PageWrapper, Song } from "@global/components";
import { useStyles } from "./styles";
import { Home as HomeIcon, Search, Book } from "react-feather";
import { useMusic } from "@services/music-player/hooks";
import { useSongs } from "@services/songs/hooks";

export const Home = () => {
    const classes = useStyles();
    const { songs } = useSongs();
    const [search, setSearch] = useState<string | null>(null);

    useEffect(() => {

    }, [search])

    return (
       <PageWrapper className={classes.homeContainer}>
            <div className={classes.topRow}>
                <h1 className={classes.title}>
                    Songs
                </h1>

                <input placeholder={"ex: Lacrimosa"} onChange={(e) => setSearch(e.target.value)}/>
            </div>
           
            <div className={classes.songContainer}>
                {
                    songs && (search ? songs.map((song, index) => song.title.toLowerCase().includes(search.toLowerCase()) ? <Song song={song} key={index}/> : null) 
                        : songs.map((song, index) => <Song song={song} key={index}/>))
                }
            </div>
       </PageWrapper>
    )
};