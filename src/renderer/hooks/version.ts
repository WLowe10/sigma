import { useState, useEffect } from "react";

export const useVersion = () => {
    const [version, setVersion] = useState<string | null>(null);

    const getVersion = async () => {
        const appVersion = await window.electron.appService.getVersion();
        setVersion(appVersion);
    };

    useEffect(() => {
        getVersion();
    }, [])

    return version;
}