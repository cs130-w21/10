import React, { useEffect, useState } from 'react';
import { db, getCurrentUser } from '../../services/firebase';

export default function Profile() {
  let [info, setInfo] = useState({
    name: '',
    email: '',
  });
  
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const ref = db.ref('Users/' + currentUser.uid);
      ref.once('value').then((snapshot) => {
        console.log(snapshot.val());
        setInfo(snapshot.val().personalInfo);
      });
    }
  }, []);
  console.log(info);
  return (
    <>
      <h1>Name: {info.name}</h1>
      <h4>Email: {info.email}</h4>
    </>
  );
  
}