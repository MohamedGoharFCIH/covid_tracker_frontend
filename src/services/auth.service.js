import axios from "axios";

const API_URL = process.env.API_URL;


const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "login", {
            username,
            password,
        })
        .then((response) => {
            if (response.token) {
                localStorage.setItem("token", JSON.stringify(response.token));
            }
            return response.token;
        });
};

const logout = () => {
    localStorage.removeItem("token");
};

const getCurrentUser = () => {
    
    return axios
        .get(API_URL + "user")
        .then((response) => {
            return response.data;
        });
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
