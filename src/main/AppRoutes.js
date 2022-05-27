import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "../screens/home/Home";
import Login from "../screens/login/Login";

import CreateDepartament from "../screens/createDepartament/CreateDepartament";
import ViewDepartaments from "../screens/viewDepartaments/ViewDepartaments";
import UpdateDepartament from "../screens/updateDepartament/UpdateDepartament";
import DeleteDepartament from "../screens/deleteDepartament/DeleteDepartament";

import CreateUser from "../screens/createUser/CreateUser";
import ViewUsers from "../screens/viewUsers/ViewUsers";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Route component = { Home } path ="/" exact />
            <Route component = { Login } path="/login" />

            <Route component = { CreateDepartament } path="/createDepartament" />
            <Route component = { ViewDepartaments } path="/viewDepartaments" />
            <Route component = { UpdateDepartament } path="/updateDepartament" />
            <Route component = { DeleteDepartament } path="/deleteDepartament" />

            <Route component = { CreateUser } path="/createUser" />
            <Route component = { ViewUsers } path="/viewUsers" />
        </BrowserRouter>
    );
}

export default AppRoutes;