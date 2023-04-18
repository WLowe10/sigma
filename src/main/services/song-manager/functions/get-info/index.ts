import ytdl from "ytdl-core";

export const getInfo = async (url: string) => {
    const info = await ytdl.getBasicInfo(url);

    return {
        title: info.videoDetails.title,
        artist: info.videoDetails.ownerChannelName,
        date: info.videoDetails.publishDate,
        thumbnail: info.videoDetails.thumbnails[0]
    };
}