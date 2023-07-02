import { useState, useEffect, useRef } from "react";

// Component
import UserProperty from "./userProperty";
import EmptyMessage from "../StatesComponents/emptyMessage";

// Styles
import "./UserPropertyList.css";

// action and provider
import { updateUserEstates } from "../../../state/actions";
import { ContextState } from "../../../state/Provider";
import { useContext } from "react";

// api config
import { API_ROOT } from "../../../config/api-config";

const UserPropertyList = () => {
	const { state, dispatch } = useContext<any>(ContextState);
	const [userProperties, setUserProperties] = useState<any>([]);
	const [loading, setLoading] = useState(true);

	const updateReducer = async (estates: Array<object>) => {
		await dispatch(updateUserEstates(estates));
	};

	useEffect(() => {
		if (!state.userEstates.length) {
			fetch(`${API_ROOT}/estate/me`, {
				method: "GET",
				credentials: "include",
			})
				.then((res) => res.json())
				.then((result) => {
					if (result.length) {
						updateReducer(result);
						setUserProperties(result);
						setLoading(false);
					}
				});
		}

		if (state.userEstates.length) {
			setUserProperties(state.userEstates);
			setLoading(false);
		}
	}, [state]);

	return (
		<div className="px-6 sm:px-10 col-span-2 mt-3">
			{loading && (
				<div className="w-full flex flex-col items-center justify-center mt-20">
					<div className="lds-ring-3">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<h3>Loading your data</h3>
				</div>
			)}
			{!loading && (
				<>
					{userProperties.length ? (
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
							{userProperties.map(
								(property: any, index: number) => (
									<UserProperty
										property={property}
										key={index}
									/>
								)
							)}
						</div>
					) : (
						<EmptyMessage />
					)}
				</>
			)}
		</div>
	);
};

export default UserPropertyList;
