import { Hono } from "hono";
import { validateCloudinarySignature } from "../config/cloudinaryConfig"
const app = new Hono();

app.post("/wh/verify", async (c) => {
    try {
        const payload = await c.req.text() as string
        const timestamp = c.req.header("X-Cld-Timestamp")
        const signature = c.req.header("X-Cld-Signature") as string

        //signature verification
        if (!validateCloudinarySignature(Number(timestamp), signature, payload)) {
            return c.json({ message: "Signature Invalid", success: false }, 401)
        }
        //now store data in database

        return c.json({ message: "Successfully Uploaded", success: true }, 201)
    } catch (error: any) {
        return c.json({ message: error.message }, 500)
    }
})

export default app;