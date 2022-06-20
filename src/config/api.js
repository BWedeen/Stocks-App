/*Get info on a stock based on symbol*/
export const StockQuote = (symbol) =>
  `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${process.env.REACT_APP_FMP_KEY};`

/*Get relevant stocks based on search*/
export const SingleCoin = (searchValue) =>
  `https://financialmodelingprep.com/api/v3/search?query=${searchValue}&limit=10&exchange=NYSE&apikey=${process.env.REACT_APP_FMP_KEY}`;

/*Get stock chart data based on symbol*/
export const HistoricalChart = (symbol) =>
  `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${process.env.REACT_APP_FMP_KEY}`;

/*Get all availables stocks from financial modeling prep*/
export const StockList = () =>
  `https://financialmodelingprep.com/api/v3/available-traded/list?apikey=${process.env.REACT_APP_FMP_KEY}`;