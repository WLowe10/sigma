import { CSSProperties, ReactNode } from "react"

// const useStyles = createUseStyles({
//     draggable: {
//         "-webkit-app-region": "drag"
//     }
// })

export const Draggable = ({ children, className, style }: { children: ReactNode, className?: string, style?: CSSProperties }) => {
    return (
        <div style={style} className={className}>
            {
                children
            }
        </div>
    )
}