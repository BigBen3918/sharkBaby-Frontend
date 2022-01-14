import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "../components/header";
import Main from "../pages/main";

import "bootstrap/dist/css/bootstrap.min.css";
import "../components/assets/css/custom.css";
import "../components/assets/css/mobile.css";

function Routes() {
  return (
		<BrowserRouter>
			<Header />
			<Route exact path="/" component={Main} />
		</BrowserRouter>
  );
}

export default Routes;
