import express, { type Express } from "express"
import path from "path"

import { engine } from 'express-handlebars'
import dotenv from "dotenv"

import tickerRoute from './routes/tickers'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'views', 'layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Tickers
app.use('/', tickerRoute)
app.use('/tickers/:id', tickerRoute)

app.use((_req, res) => {
    res.status(404).send("Page Not Found")
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})