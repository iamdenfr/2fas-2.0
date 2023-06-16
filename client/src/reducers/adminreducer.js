const initialState = {
    admin: false,
    loading: false,
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADMIN_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'ADMIN':
            return {
                ...state,
                admin: true,
                loading: false,
            };
        case 'NOT_ADMIN':
            return {
                ...state,
                admin: false,
                loading: false,
            };
        default:
            return state;
    }
}

export default adminReducer;