import React from 'react';
import {useAuth} from '../../services/AuthContext'

export default function Home() {
    const {logout, uid, userData} = useAuth();
    async function handleLogout() {
        try {
          await logout();
        } catch {
          throw Error('failed to log out')
        }
      }

    return (
        <div>
            <h2>Capitalist Hinge</h2>
            <p>{uid ? uid : 'no uid'}</p>
            <p>{userData ? userData: 'no user data'}</p>
            <button onClick={() => handleLogout()}>Sign Out</button>
        </div>
    );
}