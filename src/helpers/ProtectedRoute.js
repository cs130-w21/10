import React from 'react';
import {useAuth} from '../services/AuthContext';
import {Route, Redirect} from 'react-router-dom';

const incompleteProfile = (userData) => {
    if (!userData) return true;
    if (!userData.personalInfo || !userData.personalInfo.name || userData.personalInfo.name === '') return true; 
    if (!userData.interests || userData.interests.length < 1) return true;
    if (!userData.expertises || userData.expertises.length < 1) return true;
    return false;
}

export default function ProtectedRoute({children, profileProtection = true, ...rest}) {
    const {uid, userData, loading} = useAuth();
    if (!loading) {
        return (
            <Route 
                {...rest} 
                render={({location}) => {
                    if (!uid) {
                        return (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: {from: location}
                                }}
                            />
                        );
                    }
                    /*
                      This is for the redirection if they have an incompleteProfile.
                      All we have to do is change the redirection URL to whichever
                      register page we want to have.
                    */
                    else if (profileProtection && incompleteProfile(userData)) {
                        // If we want the page to require them to be logged in,
                        // AND have a complete profile, then profileProtection will be true.
                        // This is true for most pages, which is why it is defaulted to true.
                        // However it will not be true for whichever 'complete your profile'
                        // page we decide to implement.
                        return (
                            <Redirect 
                                to={{
                                    pathname: '/complete-your-profile',
                                    state: {incompleteProfile: true}
                                }} 
                            />
                        );
                    }
                    return children;
                }}
            />
        )
    }
    else {
        return <div>Loading</div>
    }
}
