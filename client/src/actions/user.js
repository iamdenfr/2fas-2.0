import axios from "axios";

export const updateUser = (user, token) => async (dispatch) => {
    try{
        dispatch ({type: "USER_UPDATE_REQUEST"});
        const response = await axios.put("http://localhost:8000/api/user/update", user, {
            headers: {
                Authorization: `Bearer ${token}`
                }
            });
        dispatch ({type: "USER_UPDATE_SUCCESS", payload: response.data});
        console.log(response.data);
        alert("User updated successfully");
    } catch (error) {
        dispatch ({type: "USER_UPDATE_FAILED", payload: error});
        alert("Error updating user");
        console.log(error);
    }
}

export const deleteUser = (token) => async(dispatch) => {
    try{
        dispatch ({type: "USER_DELETE_REQUEST"});
        const response = await axios.delete("http://localhost:8000/api/user/delete", {
            headers: {
                Authorization: `Bearer ${token}`
                }
            });
        console.log(response.data);
        dispatch ({type: "USER_DELETE_SUCCESS", payload: response.data}); 
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
        window.location.href = '/login';
        console.log(response.data);
        alert("User deleted successfully");
    } catch (error) {
        dispatch ({type: "USER_DELETE_FAILED", payload: error});
        alert("Error deleting user");
        console.log(error);
    }
}

export const getUser = (token) => async(dispatch) => {
    try{
        dispatch ({type: "USER_GET_REQUEST"});
        const response = await axios.get("http://localhost:8000/api/user/get", {
            headers: {
                Authorization: `Bearer ${token}`
                }
            });
        dispatch ({type: "USER_GET_SUCCESS", payload: response.data});
    } catch (error) {
        dispatch ({type: "USER_GET_FAILED", payload: error});
        alert("Error retrieving user");
        console.log(error);
    }
}

export const isAdmin = (token) => async(dispatch) => {
    try{
        dispatch ({type: "ADMIN_REQUEST"});
        const response = await axios.get("http://localhost:8000/api/user/isAdmin", {
            headers: {
                Authorization: `Bearer ${token}`
                }
            });
            if (response.data.isAdmin) {
                dispatch ({type: "ADMIN", payload: response.data});
            }
            else {
            dispatch ({type: "NOT_ADMIN", payload: response.data});
            }
    } catch (error) {
        console.log(error);
    }
}
