import React, { useEffect, useState } from 'react';
import { db, getCurrentUser } from '../../services/firebase';

export default function Profile() {
  let [info, setInfo] = useState({
    Name: '',
    email: '',
  });
  
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const ref = db.ref('Users/' + currentUser.uid);
      ref.once('value').then((snapshot) => {
        console.log(snapshot);
        setInfo(snapshot.val().PersonalInfo);
      });
    }
  }, []);
  console.log(info);
  return (
    <>
      <h1>Name: {info.Name}</h1>
      <h4>Email: {info.email}</h4>
    </>
  );
  
}