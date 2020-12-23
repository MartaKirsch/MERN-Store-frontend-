import './App.css';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Account from './components/Account.js';
import CartPage from './components/CartPage.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path="/account" component={Account}/>
            <Route exact path="/cart" component={CartPage}/>
            <Route path="/" component={Account}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
