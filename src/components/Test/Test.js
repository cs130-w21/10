import React, {useState} from 'react';
import { useAuth } from '../../services/AuthContext';

export default function TestComponent() {
    let [state, setState] = useState(0)
    let { uid } = useAuth();
    return (
        <div>
            <div>test page state: {state}</div>
            <div>uid: {uid}</div>
            <button type="button" onClick={() => setState(state+1)}>xd</button>
        </div>
    );
}