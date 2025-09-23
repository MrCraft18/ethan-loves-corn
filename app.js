import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.get('/videoCount', (req, res) => {
    const count = fs.readdirSync(path.join(__dirname, 'public', 'videos')).length
    res.send(count)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server Listening on: " + port)
})
