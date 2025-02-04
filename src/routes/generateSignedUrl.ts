import { Hono } from 'hono'
import { generateSignedUrl } from '../config/cloudinaryConfig';


const app = new Hono();

app.get('/get-signed-url/:userId', async (c) => {
    try {
        //authenticate request

        const userId = c.req.param("userId") as string
        const signedUrl = await generateSignedUrl(userId)
        return c.json({signedUrl}, 201)

    } catch (error: any) {
        return c.json({ message: error.message, success: false }, 500)
    }
})

export default app