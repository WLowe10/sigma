import { PageWrapper, Song } from "@global/components";
import { useStyles } from "./styles";
import { Home as HomeIcon, Search, Book } from "react-feather";
import { useMusic } from "@services/music-player/hooks";
import { testCommand } from "../../commands";

export const Home = () => {
    const classes = useStyles();

    testCommand()


    return (
       <PageWrapper className={classes.homeContainer}>
            <div className={classes.songContainer}>
                <Song />
            </div>
       </PageWrapper>
    )
};