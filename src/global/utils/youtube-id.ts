export const getYoutubeId = (url: string) => {
    return url.split("?v=")[1];
}