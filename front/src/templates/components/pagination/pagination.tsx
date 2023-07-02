import { useContext } from "react";

import ChevronLeft from "../icons/chevronLeft";
import ChevronRight from "../icons/chevronRight";

// Context
import { updateSearchPage, updateEstateList } from "../../../state/actions";
import { ContextState } from "../../../state/Provider";

// config
import { API_ROOT } from "../../../config/api-config";

const Pagination = () => {
	const { state, dispatch } = useContext<any>(ContextState);

	const updateSearchPageIndex = async (e: any) => {
		await dispatch(updateSearchPage(e.target.dataset.id));

		try {
			let properties: any = await fetch(
				`${API_ROOT}/estate?page=${e.target.dataset.id}`
			)
				.then((res) => res.json())
				.then((result) => result);

			await dispatch(updateEstateList(properties));
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex flex-row items-center mx-auto my-8 pb-8 lg:pb-0">
			<ChevronLeft />
			<div className="flex items-center list-none mx-4">
				<p
					className={`cursor-pointer mx-2 px-3 py-1 border-2 rounded-full ${
						state.searchPageIndex === 1 ? "border-blue-500" : ""
					}`}
					data-id={1}
					onClick={updateSearchPageIndex}
				>
					1
				</p>
				<p
					className={`cursor-pointer mx-2 px-3 py-1 border-2 rounded-full ${
						state.searchPageIndex === 2 ? "border-blue-500" : ""
					}`}
					data-id={2}
					onClick={updateSearchPageIndex}
				>
					2
				</p>
				<p
					className={`cursor-pointer mx-2 px-3 py-1 border-2 rounded-full ${
						state.searchPageIndex === 3 ? "border-blue-500" : ""
					}`}
					data-id={3}
					onClick={updateSearchPageIndex}
				>
					3
				</p>
				<p
					className={`cursor-pointer mx-2 px-3 py-1 border-2 rounded-full ${
						state.searchPageIndex === 4 ? "border-blue-500" : ""
					}`}
					data-id={4}
					onClick={updateSearchPageIndex}
				>
					4
				</p>
				<p
					className={`cursor-pointer mx-2 px-3 py-1 border-2 rounded-full ${
						state.searchPageIndex === 5 ? "border-blue-500" : ""
					}`}
					data-id={5}
					onClick={updateSearchPageIndex}
				>
					5
				</p>
			</div>
			<ChevronRight />
		</div>
	);
};

export default Pagination;
