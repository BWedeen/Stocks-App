import React from 'react'
import { useHistory } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, makeStyles, createTheme, ThemeProvider } from "@material-ui/core";

import { FaCrosshairs } from 'react-icons/fa';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "white",
    fontFamily: "Montserrat",
    fontWeight: "700",
    cursor: "pointer",
  }
}))

const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fcfcfc",
      },
      type: "dark",
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position='sticky'>
          <Container>
              <Toolbar>
                <FaCrosshairs
                  size={"26"}
                  style={{
                    cursor: "pointer"
                  }}
                  onClick={()=> {
                      history.push("/")
                      }
                    }
                />
                <div style={{
                  paddingLeft: "10px"
                }}>
                  <Typography 
                    style={{
                      color: "black",
                      
                    }}
                    onClick={()=> {
                      history.push("/")
                    }} 
                    className={classes.title}
                    varaint='h6'
                  > 
                     Stock Tracker 
                  </Typography>
                </div>
              </Toolbar>
          </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header