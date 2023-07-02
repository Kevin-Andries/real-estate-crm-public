import { useReducer, createContext } from "react";

export interface IState {
	isLoggedIn: boolean;
	userDetails: object;
	userEstates: Array<object>;
	estateList: Array<object>;
	map: object;
	bounds: object;
	searchPageIndex: number;
}

const initialState: IState = {
	isLoggedIn: false,
	userDetails: {
		email: "",
		account_type: null,
		firstname: "",
		lastname: "",
		username: "",
		user_id: null,
	},
	estateList: [],
	userEstates: [],
	map: {},
	bounds: {},
	searchPageIndex: 1,
};

interface IAction {
	type: string;
	payload: any;
}

function reducer(state: IState, action: IAction) {
	switch (action.type) {
		case "LOG_IN":
			return {
				...state,
				isLoggedIn: true,
				userId: action.payload,
			};

		case "GITHUB_LOGIN":
			return {
				...state,
				isLoggedIn: true,
				userDetails: {
					...state.userDetails,
					username: action.payload.username,
					user_id: action.payload.userId,
				},
			};

		case "EMAIL_LOGIN":
			console.log("action payload", action.payload);
			return {
				...state,
				isLoggedIn: true,
				userDetails: {
					email: action.payload.email,
					account_type: action.payload.account_type,
					firstname: action.payload.firstname,
					lastname: action.payload.lastname,
					user_id: action.payload.user_id,
				},
			};
		case "USER_REGISTRATION":
			return {
				...state,
				isLoggedIn: true,
				userDetails: {
					email: action.payload.email,
					account_type: action.payload.account_type,
					firstname: action.payload.firstname,
					lastname: action.payload.lastname,
					user_id: action.payload.user_id,
				},
			};

		case "ADD_USER_ESTATE":
			return {
				...state,
				userEstates: action.payload,
			};

		case "UPDATE_USER_LIST":
			return {
				...state,
				estateList: action.payload,
			};
		case "LOG_OUT":
			return {
				...state,
				isLoggedIn: false,
				userId: {
					email: "",
					account_type: null,
					firstname: "",
					lastname: "",
					username: "",
					user_id: null,
				},
				userEstates: [],
			};

		case "SET_GOOGLE_MAP_OBJECT":
			return {
				...state,
				map: action.payload,
			};

		case "SET_GOOGLE_BOUNDS_OBJECT":
			return {
				...state,
				bounds: action.payload,
			};

		case "UPDATE_SEARCH_PAGE_INDEX":
			return {
				...state,
				searchPageIndex: action.payload,
			};

		default:
			console.error("Action not found in reducer");
			return state;
	}
}

export const ContextState = createContext<IState | undefined>(undefined);

interface IProps {
	children: React.ReactNode;
}

const ContextProvider = ({ children }: IProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value: any = { state, dispatch };

	return (
		<ContextState.Provider value={value}>{children}</ContextState.Provider>
	);
};

export default ContextProvider;
