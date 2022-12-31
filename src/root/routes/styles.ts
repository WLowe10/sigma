import { createUseStyles } from "react-jss";
import { Theme } from "@global/constants/theme";
import { Fonts, FontWeights } from "@global/constants/fonts";

export const useStyles = createUseStyles({
    app: {
        backgroundColor: Theme.background,
        flexDirection: "column"
    },
    sideBar: {
        display: "flex",
        maxWidth: "20rem",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: Theme.black,
        flex: 1,
        gap: 20,
        padding: {
            top: "5rem",
            left: "2rem"
        }
    },
    mainContainer: {
        display: "flex",
        flexDirection: "row",
        flex: 1
    },
    pageContainer: {
        display: "flex",
        flex: 1
    }
});