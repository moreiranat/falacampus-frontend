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
                <Route component={CreateDepartament} path="/createDepartament" />

                {/* <RestrictedRoute show={props.isAuthenticated} component={CreateDepartament} path="/createDepartament" /> */}
                <RestrictedRoute show={props.isAuthenticated} component={ViewDepartaments} path="/viewDepartaments" />
                <RestrictedRoute show={props.isAuthenticated} component={UpdateDepartament} path="/updateDepartament/:id" />
                <RestrictedRoute show={props.isAuthenticated} component={DeleteDepartament} path="/deleteDepartament" />

                <RestrictedRoute show={props.isAuthenticated} component={CreateUser} path="/createUser" />
                <RestrictedRoute show={props.isAuthenticated} component={ViewUsers} path="/viewUsers" />
                <RestrictedRoute show={props.isAuthenticated} component={UpdateUser} path="/updateUser/:id" />
                <RestrictedRoute show={props.isAuthenticated} component={DeleteUser} path="/deleteUser" />

                <RestrictedRoute show={props.isAuthenticated} component={CreateComment} path="/createComment" />
                <RestrictedRoute show={props.isAuthenticated} component={ViewComments} path="/viewComments" />
                <RestrictedRoute show={props.isAuthenticated} component={UpdateComment} path="/updateComment/:id" />
                <RestrictedRoute show={props.isAuthenticated} component={DeleteComment} path="/deleteComment" />

                <RestrictedRoute show={props.isAuthenticated} component={CreateAnswer} path="/createAnswer" />
                <RestrictedRoute show={props.isAuthenticated} component={ViewAnswers} path="/viewAnswer" />
                <RestrictedRoute show={props.isAuthenticated} component={UpdateAnswer} path="/updateAnswer/:id" />
            </Switch>
        </BrowserRouter>
    );
}

export default () => (
    <AuthConsumer>
        { (context) => (<AppRoutes isAuthenticated={context.isAuthenticated} />) }
    </AuthConsumer>
)