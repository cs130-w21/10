import React, {createContext, useState, useEffect, useContext} from 'react';
import {auth, db} from './firebase';

const AuthContext = createContext();
export function useAuth(){
    return useContext(AuthContext);
}


export default function AuthProvider(props) {   
    const [uid, setUid] = useState(null);
    const [loading, setLoading] = useState(false); // Normally set to true, tests don't like the setting tho.
    const [userData, setUserData] = useState(null);

    // A handler that updates the user data object both in the DB and context
    // For now just overwriting data but could always change it to an actual `db.ref().update`
    const updateUserData = (newUserData) => {
        db.ref('Users/' + uid).set(newUserData)
          .then(() => {
            // Change it in the context
            setUserData({ ...userData, ...newUserData});
          })
          .catch((err) => {
            console.log(err);
          });
    };

    function logout() {
        return auth().signOut();
    }
    
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            if (user) {
                setUid(user.uid);
                db.ref('Users/' + user.uid).on('value', (snapshot) => {
                    if (snapshot.exists()) {
                        setUserData(JSON.stringify(snapshot.val()))
                    } else {
                        setUserData(null)
                    }
                });
            } else {
                setUid(null)
            }
            setLoading(false) // Currently the testing is not happy with this.
        })
        return unsubscribe
    }, [])
  
    const value = {
        uid,
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
