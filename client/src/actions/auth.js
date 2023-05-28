import axios from "axios";

export const register = async (user) =>  {
    try {
        const response = await axios.post("http://localhost:8000/api/auth/register", user)
        .then((res) => {
            console.log(`User ${user.username} registered successfully`);
            alert(`User ${user.username} registered successfully`);
        })
        .catch((err) => {
            alert("Error registering user " + user.username);
            console.log(err);
        });
        alert(response.message);
    } catch (error) {
        alert(error);
    }
}