import { useSynchronize } from "./synchronize";
import type { StoreApi, useStore } from "zustand"; 

// interface hasKeyValue<K extends keyof T, T> {
//   [key: K]: any;
// };

// export const useSynchronizeStore = <T extends Record<string, any>, K extends string>(key: K, useStoreHook: typeof useStore) => {
//     // const loadInitial = useStore(state => state.loadInitial);
//     const save = useSynchronize(key, loadInitial);

//     useStore.subscribe((state: T) => {
//         save(state[key])
//     })
// }