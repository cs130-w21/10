import React, { useEffect, useState } from 'react';
import firebase, { getCurrentUser } from '../../services/firebase';

export default function Profile() {
  let [info, setInfo] = useState({
    Name: '',
    email: '',
  });
  
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const ref = firebase.ref('Users/' + currentUser.uid);
      ref.once('value').then((snapshot) => {
        setInfo(snapshot.val().PersonalInfo);
      });
    }
  }, []);
  return (
    <>
      <h1>Name: {info.Name}</h1>
      <h4>Email: {info.email}</h4>
    </>
  );
  
}