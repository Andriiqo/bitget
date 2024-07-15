import express, { type Express } from "express"
import  path  from "path"

import dotenv from "dotenv"

import tickerRoute from './routes/tickers'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "hbs")
app.use(express.urlencoded({ extended: false }))

// Tickers
app.use('/', tickerRoute)
app.use('/tickers/:id', tickerRoute)

app.use((req, res, next) => {
    res.status(404).send("Page Not Found")
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})