import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Edit from "../pages/Edit";
import DefaultLayout from "../components/layout/DefaultLayout";
import GuestLayout from "../components/layout/GuestLayout";

let router = createBrowserRouter([
    {
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/edit",
                element: <Edit />,
            },
        ],
    },
]);

export default router;
