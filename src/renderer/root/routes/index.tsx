import { Children, ReactNode } from "react";
// import { useStyles } from "./styles";
import { Home as HomeIcon, Search, Book, Plus, Grid } from "react-feather";
import { BrowserRouter, Routes as NavRoutes, Route } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { SideBar } from "@renderer/components";

//* Pages */
import { Home, Download } from "@renderer/pages/index";

// import { MusicPlayer } from "@renderer/services/music-player/components";
import { RouteTypes } from "@renderer/constants/routes";
import { MusicPlayer } from "@renderer/services/music-player/components";

export const Routes = () => {
    return (
        // <FullFlex className={classes.app}>
        //    <TopBar />
           
        //     <div className={classes.mainContainer}>
        //         <BrowserRouter>
        //             <div className={classes.sideBar}>
        //                 <SideBarItem name="Home" icon={<Grid color={"White"} size={32}/>} path={RouteTypes.Home} />
        //                 <SideBarItem name="Library" icon={<Book color={"White"} size={32}/>} path={RouteTypes.Home} />
        //                 <SideBarItem name="Add Song" icon={<Plus color={"White"} size={32}/>} path={RouteTypes.Download} />
        //             </div>

        //             <div className={classes.pageContainer}>
        //             </div>  
        //         </BrowserRouter>              
        //      </div>
        //     <MusicPlayer />
        // </FullFlex>
        <Flex height={"100vh"} width={"100vh"} direction={"column"}>
            <Flex direction={"row"} height={"100%"} width={"100%"}>
                <BrowserRouter>
                    <SideBar />
                    <NavRoutes>
                        <Route path={RouteTypes.Home} element={<Home />} />
                        <Route path={RouteTypes.Download} element={<Download />} />
                    </NavRoutes>
                </BrowserRouter>
            </Flex>
            <MusicPlayer />
        </Flex>
    )
};