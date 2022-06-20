import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { createTheme, ThemeProvider, Container, Typography, TextField, LinearProgress, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';

import { StockList } from '../config/api';
import stock from 'financialmodelingprep/lib/stock';



const StockTable = () => {

    const [stocks, setStocks] = useState([])
    const [loading, setLoading] = useState(false); 
    const history = useHistory();
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1);

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

    console.log("Data:");
    console.log(stocks);               

    /*Basic styling*/
    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
    })

    const handleSearch = () => {
        
        return stocks.filter((stock) =>
            stock.name.toLowerCase().includes(search.toLowerCase()) ||
            stock.symbol.toLowerCase().includes(search.toLowerCase())
        );
      };

    
    

    // const useStyles = makeStyles(({
    //     row: {
    //         backgroundColor: "#16171a",
    //         cursor: "pointer",
    //         "&:hover": {
    //           backgroundColor: "#131111",
    //         },
    //         fontFamily: "Montserrat",
    //       },
    // }))

    // const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center"}}>
                <Typography
                    variant="h4"
                    style={{ margin: 18, fontFamily: "Montserrat" }}
                >
                </Typography>
                <TextField 
                    label="Search for stocks"
                    variant="outlined"
                    style={{marginBottom: 20, width: "100%"}}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                <TableContainer>
                    {loading ? (
                        <LinearProgress style={{background: "white"}}/>
                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: "#fcfcfc" }}>
                                <TableRow>
                                    {["Stock", "Price", "Exchange"].map((head) => (
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
                            <TableBody>
                                { handleSearch()
                                    // Limit how many stocks are shown per page
                                    .slice((page - 1) * 10, (page-1) * 10 + 10)
                                    .map(row => {

                                    return (
                                        <TableRow
                                            onClick={() => history.push(`/stocks/${row.symbol}`)}
                                            key={row.id}
                                        >
                                            <TableCell 
                                                component='th' 
                                                scope='row'
                                                styles={{
                                                    display: "flex",
                                                    gap: 3,
                                                }}
                                            >
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <span style={{
                                                        fontSize: 22,
                                                    }}>
                                                        {row.symbol}
                                                    </span>
                                                    <span style={{ color:"darkgrey"}}> {row.name} </span> 
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                {"$"}{row.price}
                                            </TableCell> 

                                            <TableCell>
                                                {row.exchange}
                                            </TableCell>               
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
                <Pagination
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    count={(handleSearch()?.length/10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0,450);
                    }}
                />
            </Container>
        </ThemeProvider>
    )
}

export default StockTable