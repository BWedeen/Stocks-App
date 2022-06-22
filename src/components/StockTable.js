import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { createTheme, ThemeProvider, Container, Typography, TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import { StockList } from '../config/api';
import StockContext from '../StockContext';

const StockTable = () => {

    /*For formatting currency*/
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    console.log("STOCK CONTEXT", StockContext);
    // const [ stocks ] = StockContext();
    // console.log("STOCK LIST", stocks); 

    const history = useHistory();
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1);
    const [stocks, setStocks] = useState([])
    const [loading, setLoading] = useState(false);

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

    console.log("All stock symbols/names:", stocks);   
               
    /*Basic styling*/
    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fffff",
          },
          type: "dark",
        },
    })

    const cellStyle = {
        fontWeight: "400",
        fontFamily: "Montserrat",
    }

    const handleSearch = () => {
        
        return stocks.filter((stock) =>
            stock.name.toLowerCase().includes(search.toLowerCase()) ||
            stock.symbol.toLowerCase().includes(search.toLowerCase())
        );
      };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center",  paddingTop: "1.5rem"}}>
                <Typography
                    variant="h4"
                    style={{ 
                        textAlign: "left", 
                        marginBottom: "1.5rem",
                        fontFamily: "Montserrat" ,
                        fontWeight: "200",
                        color: "white",
                    }}
                >
                    Find stocks from every major exchange.
                </Typography>
                <TextField 
                    label="Search for stocks"
                    variant="filled"
                    style={{marginBottom: 25, width: "100%"}}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                <TableContainer>
                    {loading ? (
                        <> 
                            Loading...
                        </>
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
                            <TableBody
                                style={{
                                    backgroundColor: "#14161a"
                                }}>
                                { handleSearch()
                                    // Limit how many stocks are shown per page
                                    .slice((page - 1) * 10, (page-1) * 10 + 10)
                                    .map(row => {

                                    return (
                                        <TableRow
                                            onClick={() => { 
                                                history.push(`/${row.symbol}`)
                                            }}
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
                                                        cursor: "pointer",
                                                        fontSize: 22,
                                                    }}>
                                                        {row.symbol}
                                                    </span>
                                                    <span style={{ color:"darkgrey"}}> {row.name} </span> 
                                                </div>
                                            </TableCell>

                                            <TableCell style={cellStyle}>
                                                {formatter.format(row.price)}
                                            </TableCell> 

                                            <TableCell style={cellStyle}>
                                                {row.exchangeShortName}
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