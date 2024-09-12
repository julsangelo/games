import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../ajax/axiosClient";

export default function DefaultLayout() {
    let { session, setUser } = useStateContext();

    if (!session) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div>
            <Outlet />
        </div>
    );
}
