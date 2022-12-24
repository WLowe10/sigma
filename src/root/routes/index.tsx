import { Children, ReactNode } from "react";
import { SideBarItem } from "./components";
import { useStyles } from "./styles";
import { Home as HomeIcon, Search, Book } from "react-feather";

//* Pages */
import { Home } from "@pages/home";
import { FullFlex } from "@global/components";
import { MusicPlayer } from "@services/music-player/components";



export const Routes = () => {
    const classes = useStyles();

    return (
        <FullFlex className={classes.app}>
            <div className={classes.sideBar}>
                <SideBarItem name="Home" icon={<HomeIcon color={"White"} size={32}/>} />
                <SideBarItem name="Search" icon={<Search color={"White"} size={32}/>} />
                <SideBarItem name="Library" icon={<Book color={"White"} size={32}/>} />
            </div>

            <div className={classes.mainContainer}>
                <Home />

                <MusicPlayer />
            </div>
        </FullFlex>
    )
};