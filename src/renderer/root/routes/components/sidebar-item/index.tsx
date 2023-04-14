import { ReactNode } from "react";
import { Home } from "react-feather";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";

type Props = {
    icon: ReactNode,
    name: string,
    path: string
};

export const SideBarItem = ({name, icon, path}: Props) => {
    const classes = useStyles();

    return (
        <Link to={path} className={classes.sideBarItem}>
            {
                icon
            }
            <h1 className={classes.label}>
                {
                name
                }
            </h1>
        </Link>
    )
};