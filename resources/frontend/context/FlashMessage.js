import React, { createContext, useCallback, useContext, useState } from "react";

let flashContext = createContext({
    status: null,
    message: null,
    setFlashStatus: () => {},
    setFlashMessage: () => {},
});

export let FlashMessage = ({ children }) => {
    let [message, setMessage] = useState(null);
    let [status, setStatus] = useState(null);

    let setFlashMessage = (flashMessage) => {
        setMessage(flashMessage);
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    };

    let setFlashStatus = (flashStatus) => {
        setStatus(flashStatus);
        setTimeout(() => {
            setStatus(null);
        }, 5000);
    };

    return (
        <flashContext.Provider
            value={{ status, message, setFlashStatus, setFlashMessage }}
        >
            {children}
        </flashContext.Provider>
    );
};

export let useFlashMessage = () => useContext(flashContext);
