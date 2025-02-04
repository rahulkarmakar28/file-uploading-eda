import { Hono } from "hono";

const app = new Hono();

app.post("/wh/verify", async (c) => {
    try {
        const data = await c.req.json();
        const { public_id, secure_url, original_filename, folder } = data;
        const userId = folder.split("/").at(-1);
        console.log(public_id, secure_url, original_filename, userId)
        //now store all data in database

        return c.json({ message: "Successfully Uploaded", success: true }, 201)
    } catch (error: any) {
        return c.json({ message: error.message }, 500)
    }
})

export default app;