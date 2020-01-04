/* tslint:disable:no-unused-variable */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
//import LoginBox from "./components/LoginBox";
//import Signup from "./components/Signup";
import Container from "./components/Container";

//ReactDOM.render(<loginBox />, document.getElementById("root"));

/*
ReactDOM.render(
    <Router>
        <div>
            <Route path="/" component={Container} />
        </div>
    </Router>,
    document.getElementById("nav")
);
*/
ReactDOM.render(
  <Router>
    <Container />
  </Router>,
  document.getElementById("root")
);
//ReactDOM.render(<Counter />, document.getElementById("root"));
serviceWorker.register();
