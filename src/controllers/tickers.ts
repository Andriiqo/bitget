import { Request, Response } from "express"

import {Ticker} from "../models/tickers"

const getTickers = (request: Request, response: Response) => {
    Ticker.startLongPolling()

    response.render("tickers", {
        tickers: Ticker.getAllTickers.data,
    })
}

const getTicker = (request: Request, response: Response) => {
    response.send(`Получение тиектА, ${request.params.id}`)
}

export default { getTickers, getTicker }