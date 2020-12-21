import './App.css';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Account from './components/Account.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path="/account" component={Account}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
