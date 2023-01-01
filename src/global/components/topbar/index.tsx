import { Draggable } from "../draggable"
import { useStyles } from "./styles"
import { Minimize, Maximize, XSquare } from "react-feather";
import { Theme } from "@global/constants/theme";
export const TopBar = () => {
    const classes = useStyles();

    return (
        <Draggable className={classes.topBar}>
            <p className={classes.topBarTitle}>
                Σ
            </p>
            <div className={classes.windowControls}>
                <Minimize color={Theme.fontColors.secondary}/>
                <Maximize color={Theme.fontColors.secondary}/>
                <XSquare color={Theme.fontColors.secondary}/>
            </div>
        </Draggable>
    )
}