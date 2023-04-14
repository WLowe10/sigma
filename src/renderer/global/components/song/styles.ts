import { Fonts } from "@global/constants/fonts";
import { Theme } from "@global/constants/theme";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
    song: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Theme.dark,
        padding: 10,
        border: "none",
        "&:hover": {
            cursor: "pointer"
        }
    },
    thumbnail: {
        objectFit: "cover",
        alignItems: "center",
        height: 64, 
        width: 64,
        borderRadius: 10,
        overflow: "hidden"
    },
    songText: {
        flex: 1,
        fontFamily: Fonts.Montserrat, 
        color: Theme.fontColors.secondary
    }
});