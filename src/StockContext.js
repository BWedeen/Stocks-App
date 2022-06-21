import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

import { StockList } from "./config/api";

const Stock = createContext();

const StockContext = ({ children }) => {
    
    /*Get all available stocks from FMP*/
    const fetchStocks = async () => {
        setLoading(true);
        const { data } = axios.get(StockList())
            .then((res) => {
                setStocks(res.data)
            })
            .catch(error => console.log(error));
        setLoading(false);
    };

    useEffect(() => {
        fetchStocks();
    }, [])

    const [stocks, setStocks] = useState([])
    const [loading, setLoading] = useState(false); 

    console.log("STOCK CONTEXT TEXT", stocks);
    console.log("CHILDREN", children);

    return (
        <Stock.Provider value={{ stocks, loading, fetchStocks }}>
            { children }
        </Stock.Provider>
    );
};

export default StockContext;

export const StockState = () => {
  return useContext(Stock);
};