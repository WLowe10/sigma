import { Clock } from "react-feather";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Center } from "@chakra-ui/react";
import { Song } from "../song";
import { useMusic } from "@renderer/services/music-player/hooks";
import type { SongType } from "@global/types";
import { useCallback } from "react";

type Props = {
    playlistId?: string,
    songs: Array<SongType>
}

export const SongTable = ({ songs, playlistId }: Props) => {
    const { state: musicState, controls: musicControls } = useMusic();

    const handlePlaySong = useCallback(() => {
        musicControls.play();
    }, []);

    const handlePauseSong = useCallback(() => {
        musicControls.pause();
    }, []);

    const handleSelectSong = useCallback((id: string) => {
        musicControls.setSong(id);
    }, []);

    return (
        <TableContainer flex={1} overflowY={"auto"}>
            <Table size={"sm"}>
                <Thead>
                    <Tr>
                        <Th>
                            <Center>
                            #
                            </Center>
                        </Th>
                        <Th>
                            Title
                        </Th>
                        <Th>
                            Date
                        </Th>
                        <Th>
                            <Clock size={16}/>
                        </Th>
                        <Th>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        songs.map((song, idx) => (
                            <Song 
                                song={song} 
                                active={musicState.activeSong == song.id} 
                                playing={musicState.playing && musicState.activeSong == song.id || false} 
                                playlist={playlistId}
                                index={idx} 
                                key={song.id}
                                controls={{
                                    play: handlePlaySong,
                                    pause: handlePauseSong,
                                    set: handleSelectSong,
                                }}
                            />
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    );
};