const initialState = {
    user: {},
    isAuth: false
}

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case "USER_LOGIN_REQUEST":
            return {
                ...state,
                user: {},
                isAuth: false
            }
        case "USER_LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload.user,
                isAuth: true
            }
        case "USER_LOGIN_FAILED":
            return {
                ...state,
                user: {},
                isAuth: false
            }
        case "USER_LOGOUT":
            return {
                ...state,
                user: {},
                isAuth: false
            }
        default:
            return state;
    }
}

export default loginReducer;