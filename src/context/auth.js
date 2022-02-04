import React, {createContext, useState} from 'react';
import {message} from "antd";

export const AuthContext = createContext({});

const isValidToken = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

const AuthProvider = (props) => {
    const [isAuthenticated, makeAuthenticated] = useState(isValidToken());

    const authenticate = async ({username, password}, cb) => {
        console.log('Username/Password:', `${username}/${password}`);

        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('token', `${username}/${password}`);
            localStorage.setItem('username', username);
            message.success('Successfully logged in.');

            makeAuthenticated(true);
            setTimeout(cb, 100);
        } else {
            message.error('Logged failed.');
        }
    };

    const signOut = async (cb) => {
        makeAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        message.success(`Logout Successful.`);
        setTimeout(cb, 100);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authenticate,
                signOut,
            }}
        >
            <>{props.children}</>
        </AuthContext.Provider>
    );
};

export default AuthProvider;
