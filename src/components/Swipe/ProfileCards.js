import React, { useEffect, useState } from "react";
import TinderCard, { displayName } from "react-tinder-card";
import { db } from "../../services/firebase";
import "./ProfileCards.css";
import { useAuth } from "../../services/AuthContext";

function ProfileCards() {
  const { uid, userData } = useAuth();

  // your array is useState
  // useState is a Hook that allows you to have state variables in functional components
  // setPeople to modifiy
  const [people, setPeople] = useState([]);

  // code that runs based on a condition

  useEffect(() => {
    // where the code runs

    var users = [];
    var usersRef = db.ref("Users");

    usersRef.once("value").then((snapshot) => {
      snapshot.forEach((child) => {
        try {
          users.push({
            key: child.key,
            name: child.val().personalInfo.name,
            work: child.val().personalInfo.work,
            education: child.val().personalInfo.education,
          });
        } catch (Error) {
          //if attributes in databased are missing / named incorrectly
        }
      });
      setPeople(users);
    });

    //this will run once when component loads and never again
  }, []);

  const onSwipe = (direction, key) => {
    if (direction == "left") {
      //update dont swipe
    }

    if (direction == "right") {
      db.ref("Users/" + uid + "/likes").push(key);

      db.ref("Users/" + key + "/likedBy").push(uid);
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
              style={{
                backgroundImage: `url("https://i.pinimg.com/originals/22/81/89/2281893b67d3f704aacd772f0569e1c4.jpg")`,
              }}
              className="card"
            >
              <h2>{person.name}</h2>
              <h3>
                {"Work: " + person.work + " Education: " + person.education}
              </h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}
export default ProfileCards;
