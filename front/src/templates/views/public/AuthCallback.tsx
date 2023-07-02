import { useEffect } from "react";
import { useHistory } from "react-router-dom";

// HOC
import HeaderAndFooterWrapper from "../../components/HOC/headerAndFooterWrapper";
import BasicTransition from "../../../HOC/basicTransition";

// style
import "./styles/githubLogin.css";

// Context provider for global state
import { useContext } from "react";
import { ContextState } from "../../../state/Provider";
import { githubLogin } from "../../../state/actions";

const AuthCallback = () => {
	const { state, dispatch } = useContext<any>(ContextState);
	let history = useHistory();

	const redirectUser = () => {
		if (state.isLoggedIn && state.userDetails.firstname) {
			// Takes the user to his private dashboard
			history.push("/dashboard");
		}
	};

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const queryParams = JSON.parse(params.get("userData") as string);

		console.log("query params", queryParams);

		dispatch(githubLogin(queryParams));

		redirectUser();
	}, [history, redirectUser]);

	return (
		<BasicTransition>
			<HeaderAndFooterWrapper>
				<div
					className="fixed z-10 inset-0 overflow-y-auto"
					aria-labelledby="modal-title"
					role="dialog"
					aria-modal="true"
				>
					<div
						className="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
      "
					>
						<div
							className="
              fixed
              inset-0
              bg-gray-500 bg-opacity-75
              transition-opacity
          "
							aria-hidden="true"
						></div>

						<span
							className="hidden sm:inline-block sm:align-middle sm:h-screen"
							aria-hidden="true"
						>
							&#8203;
						</span>

						<div
							className="
              inline-block
              align-bottom
              bg-white
              rounded-lg
              text-left
              overflow-hidden
              shadow-xl
              transform
              transition-all
              sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
          "
						>
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="flex flex-col items-center">
									<div
										className="
                          mx-auto
                          flex-shrink-0 flex
                          items-center
                          justify-center
                          h-12
                          w-12
                          rounded-full
                          bg-blue-100
                          sm:mx-0 sm:h-10 sm:w-10
                      "
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6 text-blue-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
											/>
										</svg>
									</div>
									<div className="mt-3 text-center mb-4">
										<h3
											className="
                              text-lg
                              leading-6
                              font-medium
                              text-gray-900
                          "
											id="modal-title"
										>
											You are now logged in
										</h3>
										<div className="mt-6">
											<p className="text-sm text-gray-500">
												We are taking you to your
												dashboard
											</p>
											<div className="lds-ring text-blue-600 mt-2">
												<div></div>
												<div></div>
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</HeaderAndFooterWrapper>
		</BasicTransition>
	);
};

export default AuthCallback;
