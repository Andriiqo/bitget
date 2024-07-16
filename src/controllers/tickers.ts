import { Request, Response } from "express"

import { Ticker } from "../models/tickers"

const getTickers = async (request: Request, response: Response) => {
    Ticker.startLongPolling()

    response.render("tickers", {
        title: 'Tickers',
        tickers: await Ticker.getAllTickers(),
    })
}

const getTicker = (request: Request, response: Response) => {
    response.send(`Получение тиектА, ${request.params.id}`)
}

export default { getTickers, getTicker }