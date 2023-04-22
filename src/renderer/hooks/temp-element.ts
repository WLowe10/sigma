import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { CSSProperties } from "react";

type ElementOptionsType = {
    className?: string,
    styles?: CSSProperties
};

export const useTempElement = (type: string, options?: ElementOptionsType) => {
    const id = useRef(uuidv4()).current;
    const element = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!!element.current) return;

        const tempElement = document.createElement(type || "div");
        tempElement.setAttribute("id", id);
        tempElement.style.display = "none";

        document.body.appendChild(tempElement);

        element.current = tempElement;

        return () => {
            if (!!element.current && document.body.contains(element.current)) {
                document.body.removeChild(element.current);
            }
        };
    }, [])

    return id;
}