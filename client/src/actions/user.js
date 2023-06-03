import axios from "axios";

export const updateUser = (user, token) => async (dispatch) => {
    try{
        dispatch ({type: "USER_UPDATE_REQUEST"});
        const response = await axios.put("http://192.168.1.103:8000/api/user/update", user, {
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

export const deleteUser = () => async(dispatch) => {
    try{
        dispatch ({type: "USER_DELETE_REQUEST"});
        const response = await axios.delete("http://192.168.1.103:8000/api/user/delete");
        dispatch ({type: "USER_DELETE_SUCCESS", payload: response.data});
        console.log(response.data);
        alert("User deleted successfully");
    } catch (error) {
        dispatch ({type: "USER_DELETE_FAILED", payload: error});
        alert("Error deleting user");
        console.log(error);
    }
}