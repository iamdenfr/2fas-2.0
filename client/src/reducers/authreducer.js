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
<<<<<<< Updated upstream
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
=======
                isAuth: false,
            };
        default:
            return state;
>>>>>>> Stashed changes
    }
}

export default authReducer;