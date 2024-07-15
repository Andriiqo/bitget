import express from 'express'
import tickerController from '../controllers/tickers'

const tickerRoute = express.Router()

tickerRoute.get("/", tickerController.getTickers)
tickerRoute.get("/tickers/:id", tickerController.getTicker)


export default tickerRoute