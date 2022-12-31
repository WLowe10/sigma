import { Fonts, FontWeights } from "@global/constants/fonts";
import { Theme } from "@global/constants/theme";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
    topBar: {
        display: "flex",
        alignItems: "center",
        backgroundColor: Theme.black,
        padding: 10
    },
    topBarTitle: {
        color: Theme.fontColors.primary,
        fontFamily: Fonts.Montserrat,
        fontWeight: FontWeights.Montserrat[500]
    },
}); 