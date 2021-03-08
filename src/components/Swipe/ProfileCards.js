import React, { useEffect, useState } from "react";
import TinderCard, { displayName } from "react-tinder-card";
import { db } from "../../services/firebase";
import "./ProfileCards.css";
import { useAuth } from "../../services/AuthContext";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

/**
 * @typedef {Object} ProfileCards
 * @prop {String} uid                - The unique id of the currently logged in user
 * @prop {Object} usersRef         - A JSON object from firebase that stores all users information
 * @prop {Object} userRef           - A JSON object from firebase that stores current user's information
 *
 *
 * @class
 * @classdesc Component to render the Profile Cards Deck for the given user
 * @extends React.Component
 *
 **/

function ProfileCards() {
  const { uid, userData } = useAuth();

  const [people, setPeople] = useState([]);

  /**
   * @memberof ProfileCards
   * @function setPeople
   * @description Iterate through users in firebase database and filter users to add to profile cards deck
   * @instance
   */
  useEffect(() => {
    var likes = new Set();
    var dontSwipe = new Set();
    var interests = new Set();
    const userRef = db.ref("Users/" + uid);
    userRef.on("value", (snapshot) => {
      if (snapshot !== null || snapshot !== undefined) {
        // get array of user keys that current user liked
        let likesRef = snapshot.child("likes");
        if (likesRef.val() !== null || likesRef.val() !== undefined) {
          for (let i in likesRef.val()) {
            likes.add(likesRef.child(i).val());
          }
        }

        // get array of user keys that current user already swiped on
        let dontSwipeRef = snapshot.child("dontSwipe");
        if (dontSwipeRef.val() !== null || dontSwipeRef.val() !== undefined) {
          for (let i in dontSwipeRef.val()) {
            dontSwipe.add(dontSwipeRef.child(i).val());
          }
        }
        // if dontSwipe array reaches max size (10) reset array
        if (dontSwipe.size > 10) {
          db.ref("Users/" + uid + "/dontSwipe").remove();
          dontSwipe = new Set();
        }

        // get interests of user
        let interestsRef = snapshot.child("interests");
        if (interestsRef.val() !== null || interestsRef.val() !== undefined) {
          for (let i in interestsRef.val()) {
            interests.add(interestsRef.child(i).val());
          }
        }
      }
    });

    var users = [];
    var usersRef = db.ref("Users");

    // iterate through all users in database
    usersRef.once("value").then((snapshot) => {
      snapshot.forEach((child) => {
        try {
          if (
            !(dontSwipe.has(child.key) || likes.has(child.key)) &&
            child.key != uid
          ) {
            var hasSameInterest = false;
            var childInterests = child.val().interests;
            var childInterestsString = "Unspecified";

            // get interests of certain user
            if (childInterests != undefined) {
              for (var i = 0; i < childInterests.length; i++) {
                if (i != 0) {
                  childInterestsString =
                    childInterestsString + ", " + childInterests[i];
                } else {
                  childInterestsString = childInterests[i];
                }

                // check if user has same interest of current user we are iterating for
                if (interests.has(childInterests[i])) {
                  hasSameInterest = true;
                }
              }
            } else {
            }

            // set values to default values if not defined

            var childPicture =
              child.val().personalInfo.profilePicture == null ||
              child.val().personalInfo.profilePicture == ""
                ? "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                : child.val().personalInfo.profilePicture;

            var childWork =
              child.val().personalInfo.work == null ||
              child.val().personalInfo.work == ""
                ? "Unspecified"
                : child.val().personalInfo.work;

            var childEducation =
              child.val().personalInfo.education == null ||
              child.val().personalInfo.education == ""
                ? "Unspecified"
                : child.val().personalInfo.education;

            // push those with same interests to back of array
            // which are rendered first so will be at the front of profile cards deck
            if (hasSameInterest) {
              users.push({
                key: child.key,
                name: child.val().personalInfo.name,
                work: childWork,
                education: childEducation,
                url: childPicture,
                interests: childInterestsString,
              });
            } else {
              users.unshift({
                key: child.key,
                name: child.val().personalInfo.name,
                work: childWork,
                education: childEducation,
                url: childPicture,
                interests: childInterestsString,
              });
            }
          }
        } catch (Error) {
          //if attributes in databased are missing / named incorrectly
        }
      });
      setPeople(users);
    });

    //this will run once when component loads and never again
  }, []);

  /**
   * @memberof ProfileCards
   * @function onSwipe
   * @description Handle when a user swipe left/right on a profile card and add to firebase database
   * @instance
   */
  const onSwipe = (direction, key) => {
    // not like
    // add swiped user to current user's dontSwipe
    if (direction == "left") {
      db.ref("Users/" + uid + "/dontSwipe").push(key);
    }

    // like
    // add uid to liked swiped user's likedBy, add liked swiped user to current user's likes
    if (direction == "right") {
      db.ref("Users/" + uid + "/likes").push(key);

      db.ref("Users/" + key + "/likedBy").push(uid);
    }
  };

  return (
    <div role="cards">
      <div role="cardContainer" className="profileCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.key}
            onSwipe={(d) => onSwipe(d, person.key)}
            preventSwipe={["up", "down"]}
          >
            <Card>
              <CardHeader title={person.name} />
              <CardMedia className="card" image={person.url} />
              <CardContent>
                <Typography variant="body2" color="textPrimary" component="p">
                  {"Work: " +
                    person.work.position +
                    " at " +
                    person.work.company +
                    ", " +
                    person.work.description}
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p">
                  {"Education: " +
                    person.education.school +
                    " " +
                    person.education.major +
                    ", " +
                    person.education.gradYear}
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p">
                  {"Interests: " + person.interests}
                </Typography>
              </CardContent>
            </Card>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}
export default ProfileCards;
