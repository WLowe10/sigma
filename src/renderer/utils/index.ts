export const getAudioDuration = async (src: string): Promise<number> => {
    return new Promise((resolve) => {
        try {
            const audio = new Audio(src);
    
            audio.addEventListener("loadedmetadata", () => {
               resolve(audio.duration)
            })
        } catch (err) {
            return getAudioDuration(src)
        }
       
    })
};

export const convertSeconds = (seconds: number) => {
        let floored = Math.floor(seconds);

        let hours = Math.floor(floored / 3600);
        let mins = Math.floor(floored % 3600 / 60);
        let secs = Math.floor(floored % 3600 % 60);       
        
        return (`${hours ? hours + ":" : ""}${mins ? mins + ":" : "0:"}${secs.toString().padStart(2, "0")}`);
}