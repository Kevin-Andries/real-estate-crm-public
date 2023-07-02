const EstateDetailsContactLandlord = ({ estateDetails }: any) => {
	return (
		<div className="w-full flex flex-col md:flex-row">
			<div className="w-12/12 md:w-7/12 lg:w-8/12 pr-4 mb-4 md:mb-0">
				<h2 className="text-left text-2xl mb-4 font-semibold">
					{estateDetails.title}
				</h2>
				<h4 className="text-left text-md font-semibold mb-1">
					Description of the property
				</h4>
				<p className="text-left m-0 break-word md:pr-10">
					{estateDetails.description}
				</p>

				<div className="my-4">
					<div className="flex">
						<h4 className="text-left text-md font-semibold">
							Key details
						</h4>
					</div>
					<div className="flex items-center my-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
						<p className="m-0">{estateDetails.bedrooms} bed(s)</p>
					</div>
					<div className="flex items-center my-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
						<p className="m-0">{estateDetails.bathrooms} bath(s)</p>
					</div>
					<div className="flex items-center my-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
						<p className="m-0">
							{estateDetails.square_meters} square meter(s)
						</p>
					</div>
				</div>
			</div>
			<div className="w-12/12 md:w-5/12 lg:w-4/12 md:pl-2 mb-4 md:mb-0">
				<form
					className="
              w-full
              shadow-xl
              rounded-lg
			  border-2
              flex flex-col
              px-6
              py-4
          "
				>
					<h2 className="text-left text-xl mb-4 font-semibold">
						Get in touch
					</h2>
					<div className="form-group flex flex-col mb-4 relative">
						<label className="inputLabel" htmlFor="yourName">
							Your name
						</label>
						<input
							className="inputField"
							id="yourName"
							type="text"
							placeholder="Eg: John doe"
						/>
					</div>
					<div className="form-group flex flex-col mb-4 relative">
						<label className="inputLabel" htmlFor="emailAddress">
							Email address
						</label>
						<input
							className="inputField"
							id="emailAddress"
							type="email"
							placeholder="Eg: johndoe@gmail.com"
						/>
					</div>
					<div className="form-group flex flex-col mb-4 relative">
						<label className="inputLabel" htmlFor="userMessage">
							Your message (max 500 characters)
						</label>
						<textarea
							className="inputField"
							id="userMessage"
							rows={4}
							placeholder={"..."}
						/>
					</div>
					<button
						className="
                  whitespace-nowrap
                  inline-flex
                  items-center
                  justify-center
                  px-6
                  py-2
                  border border-transparent
                  rounded-md
                  shadow-sm
                  text-base
                  font-medium
                  bg-lightBlue
                  hover:bg-darkerBlue50
                  text-white
              "
						type="submit"
					>
						Send
					</button>
				</form>
			</div>
		</div>
	);
};

export default EstateDetailsContactLandlord;
