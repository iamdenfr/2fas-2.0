const initialState = {
    user: {},
    isAuth: false
}

const getUserReducer = (state = initialState, action) => {
    switch(action.type) {
        case "USER_GET_REQUEST":
            return {
                ...state,
                user: {},
                isAuth: false
            }
        case "USER_GET_SUCCESS":
            return {
                ...state,
                user: action.payload.user,
                isAuth: true
            }
        case "USER_GET_FAILED":
            return {
                ...state,
                user: {},
                isAuth: false
            }
        default:
            return state;
    }
}

export default getUserReducer;
