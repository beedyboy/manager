import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-fancybox/lib/fancybox.css";
import "font-awesome/css/font-awesome.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "aos/dist/aos.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import AlertTemplate from 'react-alert-template-basic';
import Responder from "./services/Beedy";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import { ChakraProvider } from "@chakra-ui/react";
//optional configuration for react alert
const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

ReactDOM.render(
  <Fragment>
    <ChakraProvider>
      <Responder />
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </ChakraProvider>
  </Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
