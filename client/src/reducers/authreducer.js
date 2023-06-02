const initialState = {
    isAuth: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_AUTH_SUCCESS':
            return {
                ...state,
                isAuth: true,
            };
        case 'USER_LOGOUT':
            return {
                ...state,
                isAuth: false,
            };
        default:
            return state;
    }
}

export default authReducer;