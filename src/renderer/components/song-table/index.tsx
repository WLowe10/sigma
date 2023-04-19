import { Clock } from "react-feather";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Center } from "@chakra-ui/react";
import { Song } from "../song";
import type { SongType } from "@global/types";

export const SongTable = ({ songs }: { songs: Array<SongType> }) => {
    return (
        <TableContainer>
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
                            <Song song={{...song}} index={idx} key={song.id} />
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    );
};