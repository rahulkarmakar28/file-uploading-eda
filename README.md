# File Uploading Proof of Concept (Hono, Bun, Cloudinary)

This project demonstrates an efficient and cost-effective approach to file uploading using **Hono**, **Bun**, and **Cloudinary**. Unlike traditional methods that send files to the server before forwarding them to a storage service, this method minimizes server load and optimizes performance.

## Purpose
In traditional file uploads, large files are first sent to the server, then uploaded to services like **Cloudinary**, and their links are stored in a database. This process can lead to increased server load and high latency for large files.

### Our Approach
1. Instead of uploading files directly to the server, the client first requests a **signed URL** from the server.
2. The client then uploads the file directly to **Cloudinary** using the signed URL.
3. A **webhook** notifies the server upon successful upload, allowing the server to store the file link in the database.

### Benefits
- **No Server Load**: The server does not process large file transfers.
- **Cost-Effective**: Reduces infrastructure costs by avoiding unnecessary data transfer.
- **Faster Uploads**: Users upload directly to Cloudinary, reducing latency.

## Technologies Used
- **Hono** - Lightweight web framework
- **Bun** - Fast JavaScript runtime
- **Cloudinary** - Cloud-based media storage

## API Endpoints

### Get Signed URL
```http
GET /get-signed-url/:userId
```
#### Description
Generates a **signed URL** that allows the user to upload a file directly to **Cloudinary**.

#### Response
```json
{
    "signedUrl": {
        "url": "https://api.cloudinary.com/v1_1/{CLOUD_NAME}/auto/upload",
        "userId": "userId",
        "timestamp": timestamp,
        "signature": "signature",
        "api_key": "api_key",
        "folder": "folder/{userId}"
    }
}
```

### File Upload Using Signed URL
The client must use the signed URL to upload the file.

#### Request Body (Multipart Form Data)
- `file`: The file to be uploaded
- `signature`: The signature from the signed URL response
- `timestamp`: The timestamp from the signed URL response
- `api_key`: The API key from the signed URL response
- `folder`: The folder path from the signed URL response
- `cloud_name`: Your Cloudinary cloud name

### Webhook Verification
```http
POST /wh/verify
```
#### Description
Cloudinary sends a webhook after a successful upload, allowing the server to save the media URL in the database.

#### Response Body (Sent by Cloudinary)
```json
{
    "public_id": "unique-file-id",
    "secure_url": "https://res.cloudinary.com/...",
    "original_filename": "uploaded-file-name",
    "userId": "userid"
}
```

## Deployment
This API is deployed on **Render** and can be accessed at:
[https://file-uploading-eda.onrender.com/](https://file-uploading-eda.onrender.com/)

## License
This project is licensed under the MIT License.