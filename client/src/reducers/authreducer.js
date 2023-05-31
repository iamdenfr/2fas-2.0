const initialState = {
    loading: false,
    error: null,
};
  
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'USER_REGISTER_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
            };
        case 'USER_REGISTER_FAILED':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
  
export default authReducer;
  