import axios from "axios";

export const downloadThumbnail = async (url: string) => {
    const response = await axios.get(url, {
        responseType: "stream"
    })

    return response.data;
};