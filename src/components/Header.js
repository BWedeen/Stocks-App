import React from 'react'
import { useHistory } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, makeStyles, createTheme, ThemeProvider } from "@material-ui/core";

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
        main: "#fff",
      },
      type: "dark",
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="fff" position='sticky'>
          <Container>
              <Toolbar>
                  <Typography 
                    onClick={()=> {
                      history.push("/")
                      window.location.reload(false)}} 
                    className={classes.title}
                    varaint='h6'
                  > 
                    Stock Tracker 
                  </Typography>
              </Toolbar>
          </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header