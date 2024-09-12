import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

export default function GuestLayout() {
    let { session } = useStateContext();
    if (session) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}
