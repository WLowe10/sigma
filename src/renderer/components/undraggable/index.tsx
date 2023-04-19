import type { CSSProperties, ReactNode } from "react"

export const Undraggable = ({ children, className, style }: { children: ReactNode, className?: string, style?: CSSProperties }) => {
    return (
        <div style={style} className={className}>
            {
                children
            }
        </div>
    )
}