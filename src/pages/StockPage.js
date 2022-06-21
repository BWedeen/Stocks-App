import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { makeStyles, createTheme, Typography, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, ThemeProvider } from '@material-ui/core';
import LineChart from 'react-linechart';
import { Line } from 'react-chartjs-2';

import { StockQuote, StockChartData } from '../config/api';
import { StockInfo } from '../components';
import './StockPage.css';

const StockPage = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState();
  const [chartData, setChartData] = useState();
  const [loading, setLoading] = useState(false); 
  const [change, setChange] = useState();

  /*For formatting currency*/
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }); 

  /*Get quote for relevant stock*/
  const fetchStockData = async () => {
    const {} = await axios.get(StockQuote(symbol))
        .then((res) => {
            setStockData(res.data[0])
        })
        .catch(error => console.log(error));
  };

  /*Get chart data for relevant stock*/
  const fetchChartData = async () => {
    const {} = await axios.get(StockChartData(symbol))
        .then((res) => {
          setChartData(res.data.historical)
        })
        .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchChartData(); 
  }, [])

  useEffect(() => {
      fetchStockData(); 
  }, [])
  

  console.log("chartData", chartData);
  console.log("stockData", stockData);

  

  var data = [
    {							
        color: "white", 
        points: [{x: 1, y: 38.71}, {x: 2, y: 37.91}, {x: 3, y: 40.2}, {x: 4, y: 39.84}, {x: 5, y: 40.13}, {x: 6, y: 37.91}, {x: 7, y: 38.71}] 
    }
  ];

  /*Basic styling*/
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  })
  
  return (
    
    <div className={'container'}>
      <div className={'top'}>
        <Typography 
          variant="h3"
          style= {{
            color: "white"
          }}
        >
          {symbol}
        </Typography>
        <Typography 
          variant="h4"
          style= {{
            color: "white"
          }}
        >
          {stockData?.name}
        </Typography>
      </div>
      <ThemeProvider theme={darkTheme}>
        <TableContainer>
          <Table>
            <TableHead style={{backgroundColor: "#fcfcfc"}}>
              <TableRow>
                {["Price", "24h Change", "Quarter Date", "EPS"].map((head) => (
                  <TableCell
                      style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                          }}
                      key={head}
                  >
                      {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody style={{
                                    backgroundColor: "#14161a"
                                }}
                                >
              <TableRow>
                <TableCell>
                  {stockData?.price ? 
                    (formatter.format(stockData?.price.toFixed(2))) : 
                    ("Price Unknown")
                  }
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 500,
                  }}
                >
                  {stockData?.changesPercentage ? 
                    ((stockData?.changesPercentage).toFixed(2) + "%") : 
                    ("Change Unknown")
                  }
                </TableCell>
                <TableCell>
                  {stockData?.earningsAnnouncement ? 
                    ((stockData?.earningsAnnouncement).slice(0,10)) : 
                    ("Date Unknown")
                  }
                </TableCell>
                <TableCell>
                  {stockData?.eps ?
                    (formatter.format(stockData?.eps.toFixed(2))):
                    ("Value Unknown")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
      <>
        {chartData ? 
          ( 
             <> 
              <LineChart
                  width={800}
                  height={500}
                  data={data}
              />
             </>
          ) : (
            <>Loading...</>
          )
        }
      </>
    </div>
  )
}

export default StockPage