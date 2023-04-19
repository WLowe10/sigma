import { BrowserRouter, Routes as NavRoutes, Route } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { SideBar } from "@renderer/components";
import { RouteTypes } from "@renderer/constants/routes";
import { MusicPlayer } from "@renderer/services/music-player/components";

//* Pages */
import { Home, Download, Playlist } from "@renderer/pages/index";

export const Routes = () => {
    return (
        <Flex height={"100vh"} width={"100vw"} direction={"column"} overflow={"hidden"}>
            <Flex direction={"row"} flex={1}>
                <BrowserRouter>
                    <SideBar />
                    <NavRoutes>
                        <Route path={RouteTypes.Home} element={<Home />} />
                        <Route path={RouteTypes.Download} element={<Download />} />
                        <Route path={RouteTypes.Playlist} element={<Playlist />} />
                    </NavRoutes>
                </BrowserRouter>
            </Flex>
            <MusicPlayer />
        </Flex>
    )
};