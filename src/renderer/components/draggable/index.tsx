import { Box } from "@chakra-ui/react"
import { CSSProperties, ReactNode } from "react"

export const Draggable = ({ children, className, style }: { children: ReactNode, className?: string, style?: CSSProperties }) => {
    return (
        <Box style={style} className={className} sx={{ "WebkitAppRegion": "drag" }}>
            {
                children
            }
        </Box>
    )
}