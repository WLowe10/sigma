import { Draggable } from "../draggable"
import { Minimize, Maximize, XSquare } from "react-feather";
import { Undraggable } from "../undraggable";

export const TopBar = () => {
    return (
        <Draggable>
                Σ
            <Undraggable>
                <Minimize />
                <Maximize />
                <XSquare />
            </Undraggable> 
        </Draggable>
    )
}