// Context provider for global state
import { useContext } from "react";
import { ContextState } from "../state/Provider";

// Router object
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (route: any, key: number): any => {
	const { state } = useContext<any>(ContextState);

	if (state.isLoggedIn) {
		return (
			<Route
				key={key}
				exact={true}
				path={route.path}
				component={route.component}
			/>
		);
	} else {
		return <Redirect key={key} to={`/login`} />;
	}
};

export default ProtectedRoute;
