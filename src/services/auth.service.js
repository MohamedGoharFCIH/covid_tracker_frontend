import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;


const register = (name, email, password) => {
    return axios.post(API_URL + "signup/", {
        name,
        email,
        password,
    }).then(response=>{
        return response.data
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "login/", {
            email,
            password,
        })
        .then((response) => {
            let token = response.data.token
            let user = response.data.user
            if (token) {
                localStorage.setItem("token", JSON.stringify(token));
                localStorage.setItem("user", JSON.stringify(user));
            }
            return response.data;
        })
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

};

const getCurrentUser = () => {
    let user = localStorage.getItem("user");
    if(!user){
        return null
    }
    return JSON.parse(user);
};



const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
