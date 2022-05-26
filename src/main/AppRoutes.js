import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "../screens/home/Home";
import Login from "../screens/login/Login";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Route component = { Home } path ="/" exact />
            <Route component = { Login } path="/login" />
        </BrowserRouter>
    );
}

export default AppRoutes;