import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import LineChart from 'react-linechart';

import { ThemeProvider, createTheme } from '@material-ui/core';


const StockInfo = (chartData) => {

  
  console.log("*********")
  console.log(chartData)

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  })

  return (
   "Hello"
  )
}

export default StockInfo