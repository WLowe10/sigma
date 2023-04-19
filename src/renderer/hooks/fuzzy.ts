import { ReactEventHandler, useMemo, useState } from "react";
import FuzzySearch from "fuzzy-search";

type FuzzyReturnType<T> = {
    results: Array<T>,
    search: (query: string) => void,
};

export const useFuzzy = <T extends object>(items: Array<T>, keys: Array<string>): FuzzyReturnType<T> => {
    const fuzzy = useMemo(() => new FuzzySearch(items, keys), [items]);
    const [search, setSearch] = useState<string>("");

    const handleSearch = (query: string) => {
        setSearch(query);
    };

    return {
        results: fuzzy.search(search),
        search: handleSearch
    }
};