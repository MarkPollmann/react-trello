import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "whatwg-fetch";
import Amplify from "aws-amplify";
import {Helmet} from 'react-helmet'

import "semantic-ui-css/semantic.min.css";
import "./index.css";

import LandingPage from "./screens/LandingPage";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import awsConfig from "./aws_amplify";
import Signup from "./components/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Home  from "./screens/Home";
import Login from "./screens/Login";

Amplify.configure(awsConfig);

ReactDOM.render(
    <>
    <Helmet>
          <title>Trello</title>
        </Helmet>
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <ProtectedRoute path="/app" exact component={Home} />
    </Switch>
  </BrowserRouter>
  </>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
