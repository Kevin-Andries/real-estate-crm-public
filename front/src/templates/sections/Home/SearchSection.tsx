import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

// Context State and actions
import { ContextState } from "../../../state/Provider";
import { updateEstateList } from "../../../state/actions";

// api config
import { API_ROOT } from "../../../config/api-config";

const SearchSection = () => {
	const { dispatch } = useContext<any>(ContextState);

	const formRef = useRef<any>(null);
	let history = useHistory();

	const fetchData = async (city: string) => {
		try {
			let properties: any = await fetch(`${API_ROOT}/estate?city=${city}`)
				.then((res) => res.json())
				.then((result) => result);

			// Updating the reducer with the new value
			await dispatch(updateEstateList(properties));

			// Taking the user to the estate page
			history.push(`/find-estate`);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		let form = new FormData(formRef.current);
		let city = form.get("city") as string;

		fetchData(city);
	};

	return (
		<section
			className="w-full p-0 m-0 flex justify-center items-start relative"
			id="searchSection"
		>
			<div className="backgroundShadow"></div>
			<img
				className="object-cover w-auto searchImage h-full "
				src="images/searchPicture.jpg"
				alt="searchImage"
			/>
			<div
				className="
            flex flex-col
            absolute
            top-1/2
            left-1/2
            transform
            -translate-x-1/2 -translate-y-1/2
        	"
				style={{ minWidth: "200px" }}
			>
				<h2 className="mb-6 text-white">Your dream house is here.</h2>
				<form ref={formRef} onSubmit={handleSubmit}>
					<div className="relative flex w-full flex-wrap items-stretch mb-3">
						<span
							className="
                    z-10
                    h-full
                    leading-snug
                    font-normal
                    absolute
                    text-center text-gray-400
                    absolute
                    bg-transparent
                    rounded
                    text-base
                    items-center
                    justify-center
                    w-8
                    pl-3
                    py-3
                    right-5
                    cursor-pointer
                "
							onClick={handleSubmit}
						>
							<i className="fas fa-search"></i>
						</span>
						<input
							type="text"
							name="city"
							id="city"
							placeholder="City"
							className="inputField pl-4"
						/>
					</div>
				</form>
			</div>
		</section>
	);
};

export default SearchSection;
