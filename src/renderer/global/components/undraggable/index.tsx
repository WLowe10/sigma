import { CSSProperties, ReactNode } from "react"
// import { createUseStyles } from "react-jss"

// const useStyles = createUseStyles({
//     undraggable: {
//         "-webkit-app-region": "no-drag"
//     }
// })

export const Undraggable = ({ children, className, style }: { children: ReactNode, className?: string, style?: CSSProperties }) => {
    return (
        <div style={style} className={className}>
            {
                children
            }
        </div>
    )
}