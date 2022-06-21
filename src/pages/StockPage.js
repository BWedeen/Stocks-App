import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  makeStyles, 
  createTheme, 
  Typography, 
  TableContainer, 
  Table, 
  TableRow, 
  TableCell, 
  TableHead, 
  TableBody, 
  ThemeProvider ,
  CircularProgress,
} from '@material-ui/core';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { faker } from '@faker-js/faker';
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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    
    scales: {
      x: {
        grid: {
          color: 'rgba(145, 145, 145,0.95)',
          borderColor: '#bfbfbf'
        },
        ticks: {
          color: 'white'
        }
      },
      y: {
        grid: {
          color: 'rgba(145, 145, 145,0.15)',
          borderColor: '#bfbfbf'
        },
        ticks: {
          color: 'white'
        }
      }
    },
    color: "white",
    plugins: {
      legend: {
        display: false
      },
    },
  };
  
  const labels = ['1', '2', '3', '4', '5', '6', '7'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Stock Price',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'lightgreen',
        backgroundColor: 'white',
      },
    ],
  };

  const cellStyle = {
    fontWeight: "400",
    fontFamily: "Montserrat",
  }

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
          style={{
            color: "white",
            fontWeight: "600",
            fontFamily: "Montserrat",
          }}
        >
          {symbol}
        </Typography>
        <Typography 
          variant="h4"
          style={{
            color: "white",
            fontWeight: "400",
            fontFamily: "Montserrat",
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
                <TableCell
                  style={cellStyle}
                >
                  {stockData?.price ? 
                    (formatter.format(stockData?.price.toFixed(2))) : 
                    ("Price Unknown")
                  }
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "400",
                    fontFamily: "Montserrat",
                    color: stockData?.changesPercentage > 0 ? "rgb(14, 203, 129)" : "red",
                  }}
                >
                  {stockData?.changesPercentage ? 
                    ((stockData?.changesPercentage).toFixed(2) + "%") : 
                    ("Change Unknown")
                  }
                </TableCell>
                <TableCell
                  style={cellStyle}
                >
                  {stockData?.earningsAnnouncement ? 
                    ((stockData?.earningsAnnouncement).slice(0,10)) : 
                    ("Date Unknown")
                  }
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "400",
                    fontFamily: "Montserrat",
                    color: stockData?.eps > 0 ? "rgb(14, 203, 129)" : "red",
                  }}
                >
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
              <Typography 
                variant="h4"
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontFamily: "Montserrat",
                  paddingTop: "2.5rem",
                  paddingBottom: "2.5rem",
                }}
              >
                Performance This Week
              </Typography>
              <Line options={options} data={data} />
            </>
          ) : (
            <> 
              <div style={{display: 'flex', justifyContent: 'center', paddingTop: '10rem'}}>
                <CircularProgress
                  style={{ color: "white" }}
                  size={250}
                  thickness={1}
                />
              </div>
            </>
          )
        }
      </>
    </div>
  )
}

export default StockPage