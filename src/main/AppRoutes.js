import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

import Home from "../screens/home/Home";
import Login from "../screens/login/Login";

import CreateDepartament from "../screens/createDepartament/CreateDepartament";
import ViewDepartaments from "../screens/viewDepartaments/ViewDepartaments";
import UpdateDepartament from "../screens/updateDepartament/UpdateDepartament";
import DeleteDepartament from "../screens/deleteDepartament/DeleteDepartament";

import CreateUser from "../screens/createUser/CreateUser";
import ViewUsers from "../screens/viewUsers/ViewUsers";
import UpdateUser from "../screens/updateUser/UpdateUser";
import DeleteUser from "../screens/deleteUser/DeleteUser";

import CreateComment from "../screens/createComment/CreateComment";
import ViewComments from "../screens/viewComments/ViewComments";
import UpdateComment from "../screens/updateComment/UpdateComment";
import DeleteComment from "../screens/deleteComment/DeleteComment";
import CreateAnswer from "../screens/createAnswer/CreateAnswer";
import ViewAnswers from "../screens/viewAnswer/ViewAnswers";
import UpdateAnswer from "../screens/updateAnswer/UpdateAnswer";
import { AuthConsumer } from '../main/SessionProvider';

function RestrictedRoute({ component: Component, show, ...props }) {
    return (
        <Route exact {...props} render={(componentProps) => {
            if (show) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
                )
            }
        }} />
    )
}

function AppRoutes(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Home} path="/" exact />
                <Route component={Login} path="/login" />

                {/* <RestrictedRoute show={props.isAuthenticated} component={CreateDepartament} path="/createDepartament" />  */}
                <Route component={CreateDepartament} path="/createDepartament" />
                <Route component={ViewDepartaments} path="/viewDepartaments" />
                <Route component={UpdateDepartament} path="/updateDepartament/:id" />
                <Route component={DeleteDepartament} path="/deleteDepartament" />

                <Route component={CreateUser} path="/createUser" />
                <Route component={ViewUsers} path="/viewUsers" />
                <Route component={UpdateUser} path="/updateUser/:id" />
                <Route component={DeleteUser} path="/deleteUser" />

                <Route component={CreateComment} path="/createComment" />
                <Route component={ViewComments} path="/viewComments" />
                <Route component={UpdateComment} path="/updateComment/:id" />
                <Route component={DeleteComment} path="/deleteComment" />

                <Route component={CreateAnswer} path="/createAnswer" />
                <Route component={ViewAnswers} path="/viewAnswer" />
                
            </Switch>
        </BrowserRouter>
    );
}

export default () => (
    <AuthConsumer>
        { (context) => (<AppRoutes isAuthenticated={context.isAuthenticated} />) }
    </AuthConsumer>
)