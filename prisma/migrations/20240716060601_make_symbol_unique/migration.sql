-- CreateTable
CREATE TABLE "Ticker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "symbol" TEXT NOT NULL,
    "exchange" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticker_symbol_key" ON "Ticker"("symbol");
