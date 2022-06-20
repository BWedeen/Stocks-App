import React, { createContext, useContext, useEffect, useState } from 'react'

const Currency = createContext()

const CurrencyContext = ({ children }) => {

    const[currency, setCurrency] = React.useState("USD");
    const[symbol, setSymbol] = React.useState("$");

    useEffect(() => {
        return () => {
            if(currency === "USD") setSymbol("$");
            else if(currency === "EUR") setSymbol("€");
        }
    }, [currency]);
  
    return (
    <Currency.Provider value={{ currency, symbol, setCurrency }}>
        {children}
    </Currency.Provider>
  );
};

export default CurrencyContext

export const CurrencyState = () => {
    return useContext(Currency);
};