import React from 'react';
import 'bulma/css/bulma.min.css';
import Books from "./Books";
import Create from "./Create";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Edit from "./Edit";




function Navbar() {
return(
    <Router>
        <nav className="navbar is-dark">
            <div className="navbar-start">
                <p className="navbar-item has-text-weight-bold">Books-Shop</p>
                <Link to="/books" className="navbar-item">books</Link>
                <Link to="/create" className="navbar-item">+</Link>
            </div>
        </nav>
        <Switch>
            <Route path="/books"><Books/></Route>
            <Route path="/create"><Create/></Route>
            <Route path="/edit/:id" component={Edit}/>
        </Switch>
    </Router>

);
}

export default Navbar;