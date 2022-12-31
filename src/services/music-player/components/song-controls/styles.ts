import { Theme } from "@global/constants/theme";
import { createUseStyles } from "react-jss";  

export const useStyles = createUseStyles({
    songControls: {
        display: "flex",
        flex: 1, 
        gap: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    mainButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        borderRadius: 10,
        padding: 10,
    },
    controlButton: {
        backgroundColor: "transparent",
        border: "none",
        outline: "none"
    }
});