import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getUser = () => {
    return axios.get(API_URL + "user/", { headers: authHeader() });
}

const getUsers = () => {
    return axios.get(API_URL + "users/", { headers: authHeader() });
};

const getPatients = () => {
    return axios.get(API_URL + "patients/", { headers : authHeader() })
}

const updateUser = (user) => {
    return axios.put(API_URL + "user/", user, { headers: authHeader() });
};

const getMedicines = () => {
    return axios.get(API_URL + "medicines/", { headers: authHeader() })
}

const UserService = {
    getUser,
    getUsers,
    updateUser,
    getMedicines,
    getPatients
};

export default UserService;
