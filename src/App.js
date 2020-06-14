import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Splash from "./components/Splash";
import Candidates from "./components/Candidates";
import { BallotContextProvider } from "./components/contexts/BallotContext";
const theme = createMuiTheme({
	typography: {
		fontFamily: [
			"Poppins",
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
	},
});

function App() {
	return (
		<div>
			<Router>
				<ThemeProvider theme={theme}>
					<Switch>
						<Route exact path='/' component={Splash} />
						<Route exact path='/landing' component={Landing} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
						<BallotContextProvider>
							<Route exact path='/home' component={Home} />
							<Route
								exact
								path='/candidates/:position'
								component={Candidates}
							/>
						</BallotContextProvider>
					</Switch>
				</ThemeProvider>
			</Router>
		</div>
	);
}

export default App;
