import React from 'react';
import AuthenticationApiService from '../services/AuthenticationApiService';

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

export default class SessionProvider extends React.Component {

    state = {
        loggedUser: null,
        loading: true
    }

    constructor(){
        super();
        this.service = new AuthenticationApiService();
    }

    async componentDidMount(){

        const isAuthenticated = await this.service.isAuthenticated();

        if(isAuthenticated){
            this.start();
        }

        this.setState({loading: false});

    }

    login = async (registration, password) => {
        const user = await this.service.login(
            registration, 
            password
        );

        if(user){
            this.start();
            return user;
        } else {
            return null;
        }

    }

    start = () => { 
        const loggedUser = this.service.getLoggedUser();
        const token = this.service.getToken();

        this.setState({loggedUser});
        this.service.registerToken(token);
    }

    end = () => {
        console.log('encerrando sessão');
        this.setState({loggedUser: null});
        this.service.logout();
    }

    isAuthenticated = () => {
        return this.state.loggedUser != null;
    }

    render(){
        if(this.state.loading){
            return false;
        }

        const context = {
            loggedUser: this.state.loggedUser,
            isAuthenticated: this.isAuthenticated(),
            start: this.start,
            end: this.end,
            login: this.login
        }

        return(
            <AuthProvider value={context}>
                {this.props.children}
            </AuthProvider>
        )
    }


}