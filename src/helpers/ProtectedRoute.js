import React from 'react';
import {useAuth} from '../services/AuthContext';
import {Route, Redirect} from 'react-router-dom';

export default function ProtectedRoute({component: Component, ...rest}) {
    const {uid, loading} = useAuth();
    if (!loading) {
        return (
            <Route {...rest} 
            render={props => {
                return uid ? <Component {...props} /> : <Redirect to='/login' />
            }}
            ></Route>
        )
    }
    else {
        return <div>Loading</div>
    }
}