import { Draggable } from "../draggable"
import { Minimize, Maximize, XSquare } from "react-feather";
import { Undraggable } from "../undraggable";

export const TopBar = () => {
    return (
        <Draggable>
                Σ
            {/* <Undraggable className={classes.windowControls}>
                <Minimize color={Theme.fontColors.secondary} onClick={() => alterWin(WinAlterations.Minimize)}/>
                <Maximize color={Theme.fontColors.secondary} onClick={() => alterWin(WinAlterations.Maximize)}/>
                <XSquare color={Theme.fontColors.secondary} onClick={() => alterWin(WinAlterations.Close)}/>
            </Undraggable> */}
        </Draggable>
    )
}