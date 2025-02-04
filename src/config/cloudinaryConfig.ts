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

export const validateCloudinarySignature = (timestamp: number, signature: string, payload: string): boolean => {
    // Check if the timestamp is valid
    const currentTimestamp = Math.round(new Date().getTime() / 1000);
    if (Math.abs(currentTimestamp - timestamp) > 59 * 60) {
        return false;
    }
    // Validate the Cloudinary signature
    const isVerified = v2.utils.verifyNotificationSignature(payload, timestamp, signature, process.env.API_SECRET);
    return isVerified;
};