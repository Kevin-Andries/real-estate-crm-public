import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "flowbite";

// Context provider for global state
import ContextProvider from "./state/Provider";

ReactDOM.render(
	<React.StrictMode>
		<ContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
