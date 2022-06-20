import React from 'react'
import { useHistory } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider } from "@material-ui/core";
import { CurrencyState } from '../CurrencyContext';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  }
}))

const Header = () => {
  const classes = useStyles();
  const { currency, setCurrency } = CurrencyState();

  const history = useHistory();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
          <Container>
              <Toolbar>
                  <Typography 
                    onClick={()=> history.push("/")} 
                    className={classes.title}
                    varaint='h6'
                  > 
                    Stock App 
                  </Typography>
                  {/* <Select 
                    variant="outlined" 
                    style={{
                      width: 100,
                      height: 40,
                      marginRight: 15,
                    }}
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"EUR"}>EUR</MenuItem>
                  </Select> */}
              </Toolbar>
          </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header