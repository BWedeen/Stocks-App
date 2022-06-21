import { BrowserRouter, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import './App.css';

import Header from './components/Header';
import { Homepage, StockPage } from './pages';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Route path='/' component={Homepage} exact/>
        <Route path='/:symbol' component={StockPage} />
      </div>
    </BrowserRouter>
  );
};

export default App;
