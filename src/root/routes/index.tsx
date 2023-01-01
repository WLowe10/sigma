import { Children, ReactNode } from "react";
import { SideBarItem } from "./components";
import { useStyles } from "./styles";
import { Home as HomeIcon, Search, Book, Plus } from "react-feather";
import { BrowserRouter, Routes as NavRoutes, Route } from "react-router-dom";

//* Pages */
import { Home, Download } from "@pages/index";

import { Draggable, FullFlex, TopBar } from "@global/components";
import { MusicPlayer } from "@services/music-player/components";
import { RouteTypes } from "@global/constants/routes";

export const Routes = () => {
    const classes = useStyles();

    return (
        <FullFlex className={classes.app}>
           <TopBar />
           
            <div className={classes.mainContainer}>
                <BrowserRouter>
                    <div className={classes.sideBar}>
                        <SideBarItem name="Home" icon={<HomeIcon color={"White"} size={32}/>} path={RouteTypes.Home} />
                        <SideBarItem name="Library" icon={<Book color={"White"} size={32}/>} path={RouteTypes.Home} />
                        <SideBarItem name="Add Song" icon={<Plus color={"White"} size={32}/>} path={RouteTypes.Download} />
                    </div>

                    <div className={classes.pageContainer}>
                        <NavRoutes>
                            <Route path={RouteTypes.Home} element={<Home />} />
                            <Route path={RouteTypes.Download} element={<Download />} />
                        </NavRoutes>
                    </div>  
                </BrowserRouter>              
             </div>
            <MusicPlayer />
        </FullFlex>
    )
};