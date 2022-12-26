import { Fonts } from "@global/constants/fonts";
import { Theme } from "@global/constants/theme";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
    musicPlayer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: Theme.dark,
        padding: "1rem"
    },
    info: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
    },
    thumbnail: {
        height: 64, 
        width: 64,
        backgroundColor: "grey",
        marginRight: 10
    },
    songInfo: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
        fontFamily: Fonts.Montserrat
    },
    songTitle: {
        color: Theme.fontColors.primary,
        fontSize: ".8rem"
    },
    songArtist: {
        color: Theme.fontColors.secondary,
        fontSize: ".75rem"
    },

    songControls: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        alignItems: "center"
    },

    audioControls: {

    }
});