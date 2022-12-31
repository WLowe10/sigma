import { CSSProperties, ReactNode } from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    draggable: {
        "-webkit-app-region": "drag"
    }
})

export const Draggable = ({ children, className, style }: { children: ReactNode, className?: string, style?: CSSProperties }) => {
    const classes = useStyles();

    return (
        <div style={style} className={`${classes.draggable} ${className}`}>
            {
                children
            }
        </div>
    )
}