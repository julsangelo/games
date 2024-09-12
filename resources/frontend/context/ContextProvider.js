import React, { createContext, useContext, useState } from "react";

let stateContext = createContext({
    user: null,
    session: null,
    setUser: () => {},
    setSession: () => {},
});

export let ContextProvider = ({ children }) => {
    let [user, setUser] = useState({});
    let [session, _setSession] = useState(localStorage.getItem("SESSION"));

    let setSession = (session) => {
        _setSession(session);
        if (session) {
            localStorage.setItem("SESSION", session);
        } else {
            localStorage.removeItem("SESSION");
        }
    };

    return (
        <stateContext.Provider
            value={{
                user,
                session,
                setUser,
                setSession,
            }}
        >
            {children}
        </stateContext.Provider>
    );
};

export let useStateContext = () => useContext(stateContext);
