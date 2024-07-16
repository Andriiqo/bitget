import { PrismaClient } from '@prisma/client'

import { API } from "../config"
import { ITicker } from "../types/tickers"

const prisma = new PrismaClient()

interface ResponseTickers {
    code: string
    msg: string
    requestTime: number
    data: ITicker[]
}

export class Ticker {
    private static readonly POLL_INTERVAL = 1000;

    static startLongPolling() {
        this.fetchTickersPolling();
    }

    static async fetchTickersPolling() {
        try {
            const tickersResponse = await fetch(`${API}/v2/spot/market/tickers`);
            if (!tickersResponse.ok) {
                throw new Error(`HTTP error! status: ${tickersResponse.status}`);
            }

            const response = await tickersResponse.json() as ResponseTickers;

            for (const ticker of response.data) {
                await prisma.ticker.upsert({
                    where: { symbol: ticker.symbol },
                    update: {
                        price: ticker.lastPr,
                        timestamp: ticker.ts,
                        exchange: 'bitget',
                    },
                    create: {
                        symbol: ticker.symbol,
                        price: ticker.lastPr,
                        timestamp: ticker.ts,
                        exchange: 'bitget',
                    },
                });
            }

        } catch (error) {
            console.error("Ошибка получения тикеров:", error);
            return;
        } finally {
            setTimeout(() => this.fetchTickersPolling(), this.POLL_INTERVAL);
        }
    }

    static async getAllTickers() {
        return await prisma.ticker.findMany();
    }
}