// api config
import { API_ROOT } from "../../../config/api-config";

const GoogleAndGithubLogin = () => {
	return (
		<>
			<div>
				<p className="font-bold text-md text-left mb-2">
					Continue with
				</p>
				<div className="flex flex-col sm:flex-row">
					<a
						className="
							flex
							justify-center
							hover:text-red-700 hover:border-red-700
							border border-gray-500
							dark:hover:text-red-700
							font-bold
							rounded-lg
							py-2
							px-4
							mr-2
							w-full
							transition
							duration-300
							ease-in-out
						"
						href={`${API_ROOT}/auth/login/google`}
					>
						<img
							src="images/icons/logo-google.png"
							alt="github-logo"
							className="w-5 h-5 object-cover mr-2"
						/>
						Google
					</a>
					<a
						className="
							flex
							justify-center
							hover:border-gray-900 hover:text-black
							border border-gray-500
							dark:hover:text-gray-400
							dark:hover:border-gray-400
							font-bold
							rounded-lg
							py-2
							px-4
							mt-2
							sm:mt-0
							sm:mx-2
							w-full
							transition
							duration-300
							ease-in-out
						"
						href={`${API_ROOT}/auth/login/github`}
					>
						<img
							src="images/icons/logo-github.png"
							alt="github-logo"
							className="w-5 h-5 object-cover mr-2"
						/>
						Github
					</a>
				</div>
			</div>

			<div className="split flex justify-evenly items-center my-6">
				<div className="greyLine"></div>
				<p className="">or</p>
				<div className="greyLine"></div>
			</div>
		</>
	);
};

export default GoogleAndGithubLogin;
