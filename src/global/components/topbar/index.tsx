import { Draggable } from "../draggable"
import { useStyles } from "./styles"

export const TopBar = () => {
    const classes = useStyles();

    return (
        <Draggable className={classes.topBar}>
                <p className={classes.topBarTitle}>
                    Sigma
                </p>
            </Draggable>
    )
}