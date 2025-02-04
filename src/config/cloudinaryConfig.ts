import { v2 } from "cloudinary"
import { config } from "dotenv"

config();

export default function cloudinaryConfig() {
    const cloudinaryV2 = v2.config({
        cloud_name: process.env.CLOUD_NAME as string,
        api_key: process.env.API_KEY as string,
        api_secret: process.env.API_SECRET as string
    })
}

export const generateSignedUrl = async (userId: string) => {
    const timestamp = Math.round(new Date().getTime() / 1000) - 59 * 60
    const signature = v2.utils.api_sign_request({
        folder: `${process.env.FOLDER_NAME}/file-upload/useruploads/${userId}`,
        timestamp: timestamp
    }, process.env.API_SECRET as string)
    return {
        url: `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/auto/upload`,
        userId,
        timestamp,
        signature,
        api_key: process.env.API_KEY,
        folder: `${process.env.FOLDER_NAME}/file-upload/useruploads/${userId}`,
    }
}