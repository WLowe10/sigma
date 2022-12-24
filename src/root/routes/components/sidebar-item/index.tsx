import { ReactNode } from "react";
import { Home } from "react-feather";
import { useStyles } from "./styles";

type Props = {
    icon: ReactNode,
    name: string
};

export const SideBarItem = ({name, icon}: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.sideBarItem}>
            {
                icon
            }
            <h1 className={classes.label}>
                {
                name
                }
            </h1>
        </div>
    )
};