import { CSSProperties, ReactNode } from "react"

type Props = {
    className?: string,
    style?: CSSProperties,
    children: ReactNode
}

export const FullFlex = ({ children, style, className }: Props) => {
    return (
        <div className={className} style={{display: "flex", minHeight: "100vh", minWidth: "100vw", ...style}}>
            { 
                children
            }
        </div>
    );
}