const initialState = {
    loading: false,
    error: null,
};

const updateReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_UPDATE_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'USER_UPDATE_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
            };
        case 'USER_UPDATE_FAILED':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default updateReducer;