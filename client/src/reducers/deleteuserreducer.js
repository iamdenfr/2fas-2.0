const initialState = {
    loading: false,
    error: null,
};

const deleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_DELETE_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'USER_DELETE_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
            };
        case 'USER_DELETE_FAILED':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default deleteReducer;