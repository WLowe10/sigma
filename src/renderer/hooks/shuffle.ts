import { useRef } from "react";

export const useShuffle = <T>(searchFunc: (item: T) => any) => {
    const items = useRef<Array<T>>([]);
    const seenItems = useRef<Array<T>>([]);

    const get = () => {
        const unseenItems = items.current.filter(item => !seenItems.current.includes(item));
        const randomIdx = Math.floor(Math.random() * unseenItems.length);
        const randomItem = unseenItems[randomIdx];
        seenItems.current.push(randomItem);

        //clear the seen items once all items are seen
        if (seenItems.current.length == items.current.length) {
            seenItems.current = [];
        };

        return randomItem;
    };
  
    const set = (newItems: Array<T>) => {
        items.current = newItems;
    };

    const addSeen = (seenItem: T) => {
        seenItems.current.push(seenItem);
    };

    return { 
        get, 
        set,
    };
};