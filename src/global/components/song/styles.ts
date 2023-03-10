import { Fonts } from "@global/constants/fonts";
import { Theme } from "@global/constants/theme";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
    song: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    thumbnail: {
        height: 64, 
        width: 64,
        borderRadius: 10,
        backgroundColor: Theme.dark
    },
    songText: {
        fontFamily: Fonts.Montserrat, 
        color: Theme.fontColors.secondary
    }
});