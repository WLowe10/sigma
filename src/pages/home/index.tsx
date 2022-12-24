import { PageWrapper, Song } from "@global/components";
import { useStyles } from "./styles";
import fs from "fs";

import { Home as HomeIcon, Search, Book } from "react-feather";
import { useMusic } from "@services/music-player/hooks";

export const Home = () => {
    const classes = useStyles();

    return (
       <PageWrapper className={classes.homeContainer}>
            <div className={classes.songContainer}>
                <Song />
            </div>
       </PageWrapper>
    )
};