import { Link, useHistory } from "react-router-dom";

// Context provider for global state
import { useContext } from "react";
import { ContextState } from "../../../state/Provider";

const HeaderDashboard = ({ title, subtitle }: any) => {
	const { state } = useContext<any>(ContextState);

	return (
		<div
			className="py-2 px-6 sm:px-10 border-b-2 border-gray-100 w-full"
			id="headerDashboard"
		>
			<div className="flex justify-between items-center md:space-x-10">
				<div
					className="
              flex flex-col
              justify-center
              items-start
              lg:w-0 lg:flex-1
          "
				>
					<h1 className="text-3xl font-bold my-3">{title}</h1>
					<h5 className="text-gray-700">{subtitle}</h5>
				</div>
				<div className="flex justify-center items-center">
					{/* <!-- No notification --> */}
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							data-bs-toggle="tooltip"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
							/>
						</svg>
					</div>
					<Link to="/settings">
						<div className="userAccount flex ml-4">
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
									d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<div>
								<p className="ml-1">
									{`${state.userDetails.firstname} ${state.userDetails.lastname}`}
								</p>
								<div className="hidden">
									<ul
										className="bg-white border"
										id="userMenu"
									>
										<li className="my-1 text-left p-2 flex items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 mr-2"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											My Account
										</li>
										<li className="my-1 text-left p-2 flex items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 mr-2"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												/>
											</svg>
											Settings
										</li>
										<li className="my-1 text-left p-2 flex items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 mr-2"
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
											Logout
										</li>
									</ul>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HeaderDashboard;
