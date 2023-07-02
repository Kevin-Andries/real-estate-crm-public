// Router
import { Link, useHistory } from "react-router-dom";

// Context provider for global state
import { useContext } from "react";
import { ContextState } from "../../../state/Provider";
import { logOut } from "../../../state/actions";

// api config
import { API_ROOT } from "../../../config/api-config";

// HOC
import BasicTransitionB from "../../../HOC/basicTransitionB";

const MobileViewHeader = ({ toggleMobileViewHeader }: any) => {
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

	const menuStyle =
		"bg-white w-screen h-screen fixed top-0 right-0 overflow-y flex flex-col z-50";

	return (
		<BasicTransitionB>
			<div className={menuStyle}>
				<div
					className="top-6 right-6 absolute"
					onClick={() => toggleMobileViewHeader(false)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</div>
				<div className="items-center flex flex-col my-auto">
					<div className="flex flex-col justfiy-center items-center">
						<Link
							to="/find-estate"
							className="navigationItems px-3 py-1 rounded-sm my-2"
						>
							Top offers
						</Link>
						<Link
							to="/find-estate"
							className="navigationItems px-3 py-1 rounded-sm my-2"
						>
							Search in offers
						</Link>
						<Link
							to="/about-us"
							className="navigationItems px-3 py-1 rounded-sm my-2"
						>
							About us
						</Link>
						<Link
							to="/login"
							className="navigationItems px-3 py-1 rounded-sm my-2"
						>
							Our team
						</Link>
						<Link
							to="/contact-us"
							className="navigationItems px-3 py-1 rounded-sm my-2"
						>
							Contact us
						</Link>
					</div>
					<div className="flex flex-col justify-center items-center mt-4">
						{!state.isLoggedIn && (
							<>
								<Link
									to="/login"
									className="navigationItems px-3 py-1 rounded-sm my-2"
								>
									Sign in
								</Link>
								<Link to="/registration" className="btn my-2">
									Sign up
								</Link>
							</>
						)}
						{state.isLoggedIn && (
							<button className="btn my-2" onClick={logOutUser}>
								Log out
							</button>
						)}
					</div>
				</div>
			</div>
		</BasicTransitionB>
	);
};

export default MobileViewHeader;
