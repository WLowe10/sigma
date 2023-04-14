import { Draggable } from "../draggable"
import { useStyles } from "./styles"
import { Minimize, Maximize, XSquare } from "react-feather";
import { Theme } from "@global/constants/theme";
import { alterWin, WinAlterations } from "@global/commands";
import { Undraggable } from "../undraggable";

export const TopBar = () => {
    const classes = useStyles();

    return (
        <Draggable className={classes.topBar}>
            <p className={classes.topBarTitle}>
                Σ
            </p>
            <Undraggable className={classes.windowControls}>
                <Minimize color={Theme.fontColors.secondary} onClick={() => alterWin(WinAlterations.Minimize)}/>
                <Maximize color={Theme.fontColors.secondary} onClick={() => alterWin(WinAlterations.Maximize)}/>
                <XSquare color={Theme.fontColors.secondary} onClick={() => alterWin(WinAlterations.Close)}/>
            </Undraggable>
        </Draggable>
    )
}