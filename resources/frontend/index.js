import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./index/router.js";
import { ContextProvider } from "./context/ContextProvider.js";
import { FlashMessage } from "./context/FlashMessage.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <FlashMessage>
                <RouterProvider router={router} />
            </FlashMessage>
        </ContextProvider>
    </React.StrictMode>
);
