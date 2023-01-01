import { Providers } from "./providers";
import { Routes } from "./routes";
import { globalStyles } from "./styles";

export const Root = () => {
    globalStyles();

    return (
        <Providers>
            <Routes />
        </Providers>
    );
};