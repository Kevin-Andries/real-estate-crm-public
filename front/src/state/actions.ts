export const githubLogin = (userDetails: object) => ({
    type: "GITHUB_LOGIN",
    payload: userDetails,
});

export const emailLogin = (userDetails: object) => ({
    type: 'EMAIL_LOGIN',
    payload: userDetails
})

export const userRegistration = (userDetails: object) => ({
    type: 'USER_REGISTRATION',
    payload: userDetails
})

export const logOut = () => ({
    type: "LOG_OUT",
});

export const updateUserEstates = (userEstates: Array<object>) => ({
    type: 'ADD_USER_ESTATE',
    payload: userEstates
})

export const updateEstateList = (estatesList: Array<object>) => ({
    type: 'UPDATE_USER_LIST',
    payload: estatesList
})

export const setMapObjectFromGoogle = (map: object) => ({
    type: 'SET_GOOGLE_MAP_OBJECT',
    payload: map
})

export const setBoundsObjectFromGoogle = (bounds: object) => ({
    type: 'SET_GOOGLE_BOUNDS_OBJECT',
    payload: bounds
})

export const updateSearchPage = (page: number) => ({
    type: 'UPDATE_SEARCH_PAGE_INDEX',
    payload: page
})

