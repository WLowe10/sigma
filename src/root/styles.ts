import { Theme } from "@global/constants/theme";
import { createUseStyles } from "react-jss";

export const globalStyles = createUseStyles({
    "@global": {
        "::-webkit-scrollbar-track": {
            backgroundColor: "transparent"
        },
        "::-webkit-scrollbar": {
            width: "10px"
        },
        "::-webkit-scrollbar-thumb": {
            backgroundColor: Theme.dark2
        }
    }
})