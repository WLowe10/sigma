import { Fonts, FontWeights } from "@global/constants/fonts";
import { Theme } from "@global/constants/theme";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
    sideBarItem: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
        paddingLeft: "2rem",
        gap: 20,
        textDecoration: "none"
    },
    label: {
        fontFamily: Fonts.Montserrat,
        fontWeight: FontWeights.Montserrat[500],
        color: Theme.fontColors.primary
    }
});