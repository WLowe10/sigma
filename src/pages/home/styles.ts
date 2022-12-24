import { createUseStyles } from "react-jss";
import { Theme } from "@global/constants/theme";

export const useStyles = createUseStyles({
    homeContainer: {
        display: "flex",
        flexDirection: "column",
    },
    songContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
    }
});