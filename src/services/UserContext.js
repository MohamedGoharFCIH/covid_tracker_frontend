import React, { useState, useEffect, createContext } from 'react';
import AuthService from "./auth.service";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const checkLoggedIn = async () => {
           
            let  cuser = await AuthService.getCurrentUser();
            if(!cuser){
                localStorage.removeItem('user');
                localStorage.removeItem('token');   
            }
            
            setCurrentUser(cuser);
            setLoading(false)
        };

        checkLoggedIn();
    }, []);
    
    
    console.log('usercontext', currentUser?._id);


    return (
    
            <UserContext.Provider value={{currentUser, setCurrentUser}}>
                { !loading ? children : ""}
            </UserContext.Provider>
    );
};


export default UserContext;