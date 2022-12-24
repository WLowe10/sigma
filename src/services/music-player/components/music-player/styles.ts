import { Theme } from "@global/constants/theme";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
    musicPlayer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: Theme.dark,
        padding: "2rem"
    },
    controls: {
        maxWidth: "60rem",
        flex: 1
    }
});