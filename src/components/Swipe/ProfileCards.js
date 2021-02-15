import React, { useEffect, useState } from "react";
import TinderCard, { displayName } from "react-tinder-card";
import { db } from "../../services/firebase";
import "./ProfileCards.css";
import firebase from "firebase";

function ProfileCards({ user }) {
  user = "test";
  // your array is useState
  // useState is a Hook that allows you to have state variables in functional components
  // setPeople to modifiy
  const [people, setPeople] = useState([]);

  // code that runs based on a condition

  useEffect(() => {
    // where the code runs
    let users = [];
    var usersRef = db.ref("Users");
    usersRef.once("value").then((snapshot) => {
      for (let i in snapshot) {
        users.push(i);
      }
      for (let i in snapshot.val()) {
        users.push(i);
        db.ref("Users/" + i + "/personalInfo/name")
          .once("value")
          .then((snapshot) => {
            // users.push({ key: i, name: snapshot.val() });
          });
      }
      setPeople(users);
    });

    //this will run once when component loads and never again
  }, []);

  const getName = (key) => {
    db.ref("Users/" + key + "/personalInfo/name")
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      });
  };

  const onSwipe = (direction, key) => {
    if (direction == "left") {
      //update dont swipe
    }

    if (direction == "right") {
      /*  db.ref("Users/" + user + "/likes").update(
        "likes",
        firebase.firestore.FieldValue.arrayUnion(key)
      );
      db.ref("Users/" + key + "/likedBy").update(
        "likedBy",
        firebase.firestore.FieldValue.arrayUnion(user)
      );*/
    }
  };

  return (
    <div>
      <div className="profileCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person}
            onSwipe={(d) => onSwipe(d, person)}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{
                backgroundImage: `url("https://i.pinimg.com/originals/22/81/89/2281893b67d3f704aacd772f0569e1c4.jpg")`,
              }}
              className="card"
            >
              <h3>{person}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}
export default ProfileCards;
