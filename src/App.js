import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import { Homepage, StockPage } from './pages';

function App() {
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
