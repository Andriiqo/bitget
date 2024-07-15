import { API } from "../config"
import {ITicker} from "../types/tickers"

interface ResponseTickers {
    code: string
    msg: string
    requestTime: number
    data: ITicker[]
}

export class Ticker {
    private static responseAllTickers = {
        code: '',
        msg: '',
        requestTime: 0,
        data: [],
    } as ResponseTickers
    private static readonly POLL_INTERVAL = 1000

    static startLongPolling() {
        this.fetchTickersPolling()
    }

    static async fetchTickersPolling() {
        try {
            const tickersResponse = await fetch(`${API}/v2/spot/market/tickers`)
            if (!tickersResponse.ok) {
                new Error(`HTTP error! status: ${tickersResponse.status}`)
            }

            Ticker.responseAllTickers = await tickersResponse.json() as ResponseTickers
        } catch (error) {
            console.error("Ошибка получения тикеров:", error)
        } finally {
            setTimeout(() => this.fetchTickersPolling(), this.POLL_INTERVAL)
        }
    }

    static get getAllTickers() {
        return Ticker.responseAllTickers
    }
}