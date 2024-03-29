import React, { Component } from "react";
import { Router } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import setCurrentUser from "./actions/setUser";
import logoutUser from "./actions/logoutAction";

import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";
import { createBrowserHistory } from 'history'
import { Helmet } from 'react-helmet';
import PathRoute from "./router";
import "materialize-css/dist/css/materialize.min.css";

axios.defaults.baseURL = process.env.REACT_APP_NOT_AXIOS_BASE_URL;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to home
    window.location.href = "./";
  }
}

const history = createBrowserHistory()

class App extends Component {
  render() {
    const seo = {
      title: "Medibee",
      description:
        "Medibee is online education platform where we disseminate contemporary knowledge through live classroom , training and video based courses.",
      url: "https://Medibee.com/",
      image: ""
    };
    return (
      <>
        <Helmet
          title={seo.title}
          meta={[
            {
              name: "description",
              property: "og:description",
              content: seo.description
            },
            { property: "og:title", content: seo.title },
            { property: "og:url", content: seo.url },
          ]}
        />
        <Provider store={store}>
          <Router history={history}>
            <PathRoute />
          </Router>
        </Provider>
      </>
    );
  }
}
export default App;