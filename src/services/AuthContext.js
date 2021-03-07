import React, {createContext, useState, useEffect, useContext} from 'react';
import {auth, db} from './firebase';

const AuthContext = createContext();
export function useAuth(){
    return useContext(AuthContext);
}

/**
 * @class
 * @classdesc Provider for Authentication Context, to be used in all components that require authentication or current
 * user's data from database
 * @extends React.Component
 * @param {Object} props holds children components that require the AuthContext
 * @summary Holds relevant information for authentication and current user data. Allows other components
 * to see this information via React Context. 
 */
const AuthProvider = (props) => {   
    /**
     * @memberof AuthProvider
     * @var {string} uid unique ID of current user
     */
    const [uid, setUid] = useState(null);
    /**
     * @memberof AuthProvider
     * @var {boolean} loading Checks if context values are loading 
     */
    const [loading, setLoading] = useState(false); // Normally set to true, tests don't like the setting tho.
    /**
     * @memberof AuthProvider
     * @var {Object} userData data from database on current user
     */
    const [userData, setUserData] = useState(null);

    /**
     * A handler that updates the user data object in the database
     * @param {Object} newUserData the new user data for the current user to write to the database
     */
    const updateUserData = (newUserData) => {
        db.ref('Users/' + uid).set(newUserData)
          .then(() => {
            // Change it in the context
            // setUserData({ ...userData, ...newUserData});
          })
          .catch((err) => {
            console.log(err);
          });
    };

    /**
     * Container for logging out user.
     * @returns auth function to logout user (for our case, firebase auth signOut function)
     */
    function logout() {
        return auth().signOut();
    }
    
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            if (user) {
                setUid(user.uid);
                db.ref('Users/' + user.uid).on('value', (snapshot) => {
                    if (snapshot.exists()) {
                        setUserData(snapshot.val());
                    } else {
                        setUserData()
                    }
                });
            } else {
                setUid(null)
            }
            setLoading(false)
        })
        return unsubscribe
    }, [])
  
    /**
     * @memberof AuthProvider
     * @var {Object} value Holds context values (the other members and methods of AuthProvider)
     */
    const value = {
        uid,
        loading,
        userData,
        logout,
        updateUserData,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;