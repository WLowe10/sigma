import { createUseStyles } from "react-jss";
import { Theme } from "@global/constants/theme";
import { Fonts, FontWeights } from "@global/constants/fonts";

export const useStyles = createUseStyles({
    homeContainer: {
        display: "flex",
        flexDirection: "column",
    },
    topRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: {
            top: "1rem",
            bottom: "1rem"
        }
    },
    title: {
        fontFamily: Fonts.Montserrat,
        fontWeight: FontWeights.Montserrat[500],
        color: Theme.fontColors.primary,
        fontSize: "2rem"
    },
    songContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
    }
});