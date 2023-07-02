import { useState, useEffect } from "react";

// router
import { Link, useHistory } from "react-router-dom";

// JS object containing the private dashboard header data
import privateHeaderData from "../../../data/privateHeaderData";

// Context provider for global state
import { useContext } from "react";
import { ContextState } from "../../../state/Provider";
import { logOut } from "../../../state/actions";

// styles
import "./PrivateRouteHeader.css";

// api config
import { API_ROOT } from "../../../config/api-config";

const PrivateRouteHeader = () => {
	const [menuItemSelected, setMenuItemSelected] = useState<number>(0);
	const [headerItem, setHeaderItem] = useState<any>([]);
	const { dispatch } = useContext<any>(ContextState);
	let history = useHistory();

	const updateItemSelectedValue = (e: MouseEvent | any) => {
		history.push(`${e.target.dataset.link}`);
		setMenuItemSelected(+e.target.parentElement.dataset.id);
	};

	const logOutUser = () => {
		fetch(`${API_ROOT}/auth/logout`, {
			method: "GET",
			credentials: "include",
		}).then((res) => {
			if (!res.ok) return;

			console.log("res: ", res);

			dispatch(logOut());
			history.push("/");
		});
	};

	useEffect(() => {
		setHeaderItem(privateHeaderData);
	}, []);

	return (
		<div
			className="
        border-r-black border-1
        flex flex-row md:flex-col
        items-center md:items-left
        justify-center md:justify-between
        bg-lightGreyContrast
        py-8
        px-4
		h-16 md:h-screen
        overflow-y-auto
		fixed md:relative
		bottom-0 left-0 right-O
		z-40	
    "
			id="leftMenuContainer"
		>
			<div className="w-full hidden md:flex justify-center items-center md:mb-10">
				<Link to="/">
					<img
						className="h-8 w-auto sm:h-10"
						src="/images/logo2.png"
						alt="companyLogo"
					/>
				</Link>
				<h1 className="ml-2 text-black text-xl my-0 companyName">
					Easimmo
				</h1>
			</div>

			<div className="md:w-full flex flex-row md:flex-col items-center justify-start md:mb-10">
				{/* Looping on private header data object */}
				{headerItem.map((item: any) => (
					<div
						key={item.itemId}
						data-id={item.itemId}
						className={`
                py-2 md:py-1
                my-1
                px-4
                flex
                items-center
                justify-start
                relative
                md:w-full
                menu-items
                ${
					menuItemSelected === +item.itemId
						? "leftMenuLightBlue rounded-lg"
						: ""
				}
                `}
					>
						<div
							dangerouslySetInnerHTML={{ __html: item.icon }}
							data-id={item.itemId}
							className="md:mr-3 text-lightBlue"
							onClick={updateItemSelectedValue}
						></div>
						<button
							onClick={updateItemSelectedValue}
							data-link={item.link}
							className="
                    whitespace-nowrap
                    rounded-md
                    py-2
                    text-left
                    font-medium
                    w-full
                    text-lightBlue
                    font-semibold
                    text-lg
					hidden md:block
                "
						>
							{item.text}
						</button>
					</div>
				))}

				<div
					className="
                py-2 md:py-1
                my-1
                px-4
                flex
                items-center
                justify-start
                relative
                w-full
                menu-items
            "
				>
					<div className="md:mr-3 text-lightBlue">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8 md:h-6 md:w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							/>
						</svg>
					</div>
					<button
						onClick={logOutUser}
						className="
                    whitespace-nowrap
                    rounded-md
                    py-2
                    text-left
                    font-medium
                    w-full
                    text-lightBlue
                    font-semibold
                    text-lg
					hidden md:block
                "
					>
						Logout
					</button>
				</div>
			</div>

			<div className="text-center hidden md:block">
				<Link
					to="/login"
					className="
                flex flex-col
                justify-center
                items-center
                whitespace-nowrap
                px-6
                border border-transparent
                rounded-md
                text-center
                font-medium
                text-black
            "
					onClick={logOutUser}
				>
					<img
						className="goPremium mb-3"
						src="images/leftMenuPremium.png"
						alt="premium"
					/>
					<button className="bg-goldYellow text-black py-2 px-3 rounded-md">
						Upgrade to premium
					</button>
				</Link>
			</div>
		</div>
	);
};

export default PrivateRouteHeader;
