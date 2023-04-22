import { useState, useEffect, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useSynchronize = <T>(key: string, initialFunc?: (data: T) => any) => {
    const debouncedSave = useDebouncedCallback((value) => {
        window.electron.settingsService.set(key, value);
    }, 250);

    const handleGetInitial = async () => {
        const data = await window.electron.settingsService.get(key)
        typeof initialFunc == "function" && initialFunc(data);
    };

    useEffect(() => {
        handleGetInitial();
    }, []);

    return debouncedSave;
};