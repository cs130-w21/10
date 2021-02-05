import React, { useEffect, useState } from "react";
import TinderCard, { displayName } from "react-tinder-card";
import { db } from "../../services/firebase";
import "./ProfileCards.css";
import firebase from "firebase";

function ProfileCards({ user }) {
  user = "kjhkf";
  // your array is useState
  // useState is a Hook that allows you to have state variables in functional components
  // setPeople to modifiy
  const [people, setPeople] = useState([]);

  db.collection("people").doc("rando").set({
    name: "rando",
    url:
      "https://i.pinimg.com/originals/ee/e7/5d/eee75d6e875e7e205a1394aaa96fad12.png",
  });
  // code that runs based on a condition
  useEffect(() => {
    // where the code runs

    const unsubscribe = db
      .collection("people")
      .onSnapshot((snapshot) =>
        setPeople(snapshot.docs.map((doc) => doc.data()))
      );

    return () => {
      // cleanup
      unsubscribe();
    };

    //this will run once when component loads and never again
  }, []);

  const onSwipe = (direction, key) => {
    if (direction == "left") {
      db.collection("people")
        .doc(user)
        .update("dontSwipe", firebase.firestore.FieldValue.arrayUnion(key));
    }

    if (direction == "right") {
      db.collection("people")
        .doc(user)
        .update("likes", firebase.firestore.FieldValue.arrayUnion(key));
      db.collection("people")
        .doc(key)
        .update("likedBy", firebase.firestore.FieldValue.arrayUnion(user));
    }
  };

  return (
    <div>
      <div className="profileCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.key}
            onSwipe={(d) => onSwipe(d, person.key)}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}
export default ProfileCards;
