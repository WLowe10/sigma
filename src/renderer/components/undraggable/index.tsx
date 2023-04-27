import { Box } from "@chakra-ui/react"
import type { CSSProperties, ReactNode } from "react"

export const Undraggable = ({ children, className, style }: { children: ReactNode, className?: string, style?: CSSProperties }) => {
    return (
        <Box style={style} className={className} sx={{"WebkitAppRegion": "none"}}>
            {
                children
            }
        </Box>
    )
}