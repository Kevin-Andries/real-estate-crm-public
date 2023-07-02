// Router
import { Link, useHistory } from "react-router-dom";

// Context provider for global state
import { useContext } from "react";
import { ContextState } from "../../../state/Provider";
import { logOut } from "../../../state/actions";

// Components
import DarkModeToggle from "../Buttons/DarkModeToggle.jsx";

// api config
import { API_ROOT } from "../../../config/api-config";

const DesktopViewHeader = () => {
	const { state, dispatch } = useContext<any>(ContextState);
	let history = useHistory();

	const logOutUser = () => {
		fetch(`${API_ROOT}/auth/logout`, {
			method: "GET",
			credentials: "include",
		}).then((res) => {
			if (!res.ok) return;

			dispatch(logOut());
			history.push("/");
		});
	};

	return (
		<>
			<div className="flex justify-start items-center xl:mr-20 cursor-pointer">
				<Link to="/">
					<img
						className="h-8 w-8 sm:w-10 sm:h-10"
						src="/images/logo2.png"
						alt="companyLogo"
					/>
				</Link>
				<Link to="/">
					<h1 className="ml-2 text-black text-lg my-0 companyName dark:text-zinc-200">
						Easimmo
					</h1>
				</Link>
				<DarkModeToggle />
			</div>

			<div className="items-center hidden lg:flex">
				<Link
					to="/find-estate"
					className="navigationItems link link-underline link-underline-black"
				>
					Top offers
				</Link>
				<Link
					to="/find-estate"
					className="navigationItems link link-underline link-underline-black"
				>
					Search in offers
				</Link>
				<Link
					to="/about-us"
					className="navigationItems link link-underline link-underline-black"
				>
					About us
				</Link>
				<Link
					to="/login"
					className="navigationItems link link-underline link-underline-black"
				>
					Our team
				</Link>
				<Link
					to="/contact-us"
					className="navigationItems link link-underline link-underline-black"
				>
					Contact us
				</Link>
			</div>

			<div className="right-xl-0 hidden lg:flex items-center">
				{!state.isLoggedIn && (
					<>
						<Link
							to="/login"
							className="navigationItems link link-underline link-underline-black"
						>
							Sign in
						</Link>
						<Link to="/registration" className="btn ml-8">
							Sign up
						</Link>
					</>
				)}
				{state.isLoggedIn && (
					<button onClick={logOutUser} className="btn">
						Log out
					</button>
				)}
			</div>
		</>
	);
};

export default DesktopViewHeader;
