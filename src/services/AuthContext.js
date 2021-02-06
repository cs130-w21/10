import React, {createContext, useState, useEffect, useContext} from 'react';
import {auth, db} from './firebase';

const AuthContext = createContext();
export function useAuth(){
    return useContext(AuthContext);
}


export default function AuthProvider(props) {   
    const [uid, setUid] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

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
            setLoading(false)
        })
        return unsubscribe
    }, [])
  
    const value = {
        uid,
        userData,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && props.children}
        </AuthContext.Provider>
    )
}