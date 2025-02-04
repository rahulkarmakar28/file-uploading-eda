import { Hono } from 'hono'
import generateSignedUrl from "./routes/generateSignedUrl"
import whService from "./routes/whVerify"
import cloudinaryConfig from "./config/cloudinaryConfig"


const app = new Hono()
cloudinaryConfig()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', generateSignedUrl)
app.route('/', whService)

export default app