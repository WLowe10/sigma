import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useSynchronize = <T>(key: string, updateFunc: (save: any) => any, intialFunc?: (initial: T) => any) => {
    const syncUpdate = useDebouncedCallback((value: any) => {
        window.electron.settingsService.set(key, value);
    }, 250);

    updateFunc(syncUpdate);

    useEffect(() => {
        if (typeof intialFunc == "function") {
            window.electron.settingsService.get(key).then((data) => {
                intialFunc(data);    
            })
        }
    }, [])
};