import { useRef, useContext } from "react";

// Context State and actions
import { ContextState } from "../../state/Provider";
import { updateEstateList } from "../../state/actions";

// Helper
import { queryGenerator, queryValidation } from "../../utils/queryGenerator";

// api config
import { API_ROOT } from "../../config/api-config";

const FiltersForm = ({ setShowModal, setLoader }: any) => {
	const { dispatch } = useContext<any>(ContextState);

	const estateType = useRef<HTMLSelectElement>(null);
	const order = useRef<HTMLSelectElement>(null);
	const formRef = useRef<any>("");

	const fetchData = async (query: string) => {
		try {
			let properties: any = await fetch(`${API_ROOT}/estate${query}`)
				.then((res) => res.json())
				.then((result) => result);

			// Updating the reducer with the new value
			await dispatch(updateEstateList(properties));

			// Change loader state when the fetch call is over
			setLoader(false);

			// Closing the modal when that's over
			setShowModal(false);
		} catch (err) {
			console.log(err);
			setLoader(false);
		}
	};

	const filterSelection = (e: any) => {
		e.preventDefault();
		setLoader(true);

		const form = new FormData(formRef.current);

		// creating query object
		const queries = {
			priceMin: form.get("priceGreaterThan") as unknown as number,
			priceMax: form.get("priceLesserThan") as unknown as number,
			rooms: form.get("rooms") as unknown as number,
			squareMeters: form.get("square_meters") as unknown as number,
			estateType: form.get("rentOrSell") as string,
			order: form.get("order") as string,
			city: form.get("city") as string,
			country: form.get("country") as string,
		};

		// Generating object
		const queryObject = queryValidation(queries);

		// Generating query
		const query = queryGenerator(queryObject);

		// Fetching new data from the backend using the newly created query
		fetchData(query);
	};

	return (
		<form
			ref={formRef}
			onSubmit={filterSelection}
			className="flex flex-col items-start"
		>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full py-2">
				<div>
					<label htmlFor="price" className="inputLabel">
						Price min.
					</label>
					<input
						className="inputField"
						type="number"
						name="priceGreaterThan"
						id="priceGreaterThan"
						placeholder="Price (from)"
					/>
				</div>
				<div>
					<label htmlFor="price" className="inputLabel">
						Price max.
					</label>
					<input
						className="inputField"
						type="number"
						name="priceLesserThan"
						id="priceLesserThan"
						placeholder="Price (up to)"
					/>
				</div>
				<div>
					<label htmlFor="rooms" className="inputLabel">
						Rooms
					</label>
					<input
						className="inputField"
						type="number"
						name="rooms"
						id="rooms"
						placeholder="rooms (min)"
					/>
				</div>
				<div>
					<label htmlFor="square_meters" className="inputLabel">
						Square Meters
					</label>
					<input
						className="inputField"
						type="number"
						name="square_meters"
						id="square_meters"
						placeholder="Square meters (min)"
					/>
				</div>
				<div>
					<label htmlFor="rentOrSell" className="inputLabel">
						Estate Type
					</label>
					<select
						ref={estateType}
						name="rentOrSell"
						id="rentOrSell"
						className="inputField appearance-none"
					>
						<option defaultValue="0">Pick a value</option>
						<option value={"rent"}>Rent</option>
						<option value={"sell"}>Sell</option>
					</select>
				</div>
				<div>
					<label htmlFor="order" className="inputLabel">
						Order
					</label>
					<select
						ref={order}
						name="order"
						id="order"
						className="inputField appearance-none"
					>
						<option defaultValue="0">Order</option>
						<option value={"asc"}>Asc.</option>
						<option value={"desc"}>Desc.</option>
					</select>
				</div>
				<div>
					<label htmlFor="city" className="inputLabel">
						city
					</label>
					<input
						className="inputField"
						type="text"
						name="city"
						id="city"
						placeholder="city"
					/>
				</div>
				<div>
					<label htmlFor="country" className="inputLabel">
						country
					</label>
					<input
						className="inputField"
						type="text"
						name="country"
						id="country"
						placeholder="country"
					/>
				</div>
			</div>

			<div className="w-full flex flex-col">
				<hr className="mt-4 mb-3" />
				<div className="flex flex-row items-center justify-end">
					<button
						className="navigationItems link link-underline link-underline-black"
						onClick={() => setShowModal(false)}
					>
						Close
					</button>
					<button className="btn ml-2" type="submit">
						Filter
					</button>
				</div>
			</div>
		</form>
	);
};

export default FiltersForm;
