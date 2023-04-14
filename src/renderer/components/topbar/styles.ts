import { Fonts, FontWeights } from "@global/constants/fonts";
import { Theme } from "@global/constants/theme";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
    topBar: {
        display: "flex",
        alignItems: "center",
        backgroundColor: Theme.dark,
        padding: 10,
        justifyContent: "space-between"
    },
    topBarTitle: {
        color: Theme.fontColors.primary,
        fontFamily: Fonts.Montserrat,
        fontWeight: FontWeights.Montserrat[500]
    },
    windowControls: {
        display: "flex",
        flexDirection: "row",
        gap: 10
    }
}); 