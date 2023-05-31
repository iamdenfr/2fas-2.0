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

export const login = (email, password) => async (dispatch) => {
  try {
    const user = { email, password };
    dispatch({ type: "USER_LOGIN_REQUEST" });

    const response = await axios.post("http://localhost:8000/api/auth/login", user);

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
    console.log(`User ${user.email} logged in successfully`);
    alert(`User ${user.email} logged in successfully`);
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAILED", payload: error });
    alert("Error logging in user " + email);
    console.log(error);
  }
}

export const logout = () => (dispatch) => {
  dispatch({ type: "USER_LOGOUT" });
  localStorage.removeItem("token");
  console.log("User logged out successfully");
  alert("User logged out successfully");
}
