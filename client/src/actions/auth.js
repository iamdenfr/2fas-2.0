import axios from "axios";

export const register = (user) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_REQUEST" });

    const response = await axios.post("http://localhost:8000/api/auth/register", user);

    dispatch({ type: "USER_REGISTER_SUCCESS", payload: response.data });
    console.log(`User ${user.username} registered successfully`);
    alert(`User ${user.username} registered successfully`);
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAILED", payload: error });
    alert("Error registering user " + user.username);
    console.log(error);
  }
};
