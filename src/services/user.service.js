import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.API_URL;

const getUsers = () => {
    return axios.get(API_URL + "users", { headers: authHeader() });
};

const updateUser = (user) => {
    return axios.put(API_URL + "user", user, { headers: authHeader() });
};

const UserService = {
   getUsers,
   updateUser
};

export default UserService;
