import "./App.css";
import { useState, useEffect, useRef } from "react";

// Router object
import { routes } from "./routing/router";
import { Switch, Route, useHistory } from "react-router-dom";

// Helper
import ProtectedRoute from "./routing/ProtectedRoute";

// Components
import PrivateRouteHeader from "./templates/components/PrivateRouteHeader/PrivateRouteHeader";

// Utils
import { hidePrivateHeaderOnTheseRoutes } from "./utils/pathChecker";

function App() {
	const [showPrivateHeader, setShowPrivateHeader] = useState<boolean>(true);
	const appRef = useRef<any>();

	let history = useHistory();

	const routeComponents = routes.map((route, key) =>
		route.meta.requiresLogin ? (
			ProtectedRoute(route, key)
		) : (
			<Route
				exact={true}
				path={route.path}
				component={route.component}
				key={key}
			/>
		)
	);

	const togglePrivateHeader = (pathname: any) => {
		for (let i = 0; i < hidePrivateHeaderOnTheseRoutes.length; i++) {
			if (
				hidePrivateHeaderOnTheseRoutes[i] === pathname ||
				pathname.includes("estate-details")
			) {
				setShowPrivateHeader(false);
				appRef.current.style.display = "block";
				break;
			}

			setShowPrivateHeader(true);
			appRef.current.style.display = "flex";
		}
	};

	useEffect(() => {
		togglePrivateHeader(history.location.pathname);

		return history.listen((location) => {
			togglePrivateHeader(location.pathname);
		});
	}, [history]);

	return (
		<div
			className="App dark:bg-gray-800 dark:text-gray-200 transition"
			ref={appRef}
		>
			{showPrivateHeader && <PrivateRouteHeader />}
			<Switch>{routeComponents}</Switch>
		</div>
	);
}

export default App;
