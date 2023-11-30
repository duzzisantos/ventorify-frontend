import React from "react";
import ProfileInfo from "../auth/ProfileInfo";
import {
  PersonCircle,
  Diagram2,
  GearFill,
  PersonHeart,
  Activity,
} from "react-bootstrap-icons";
import Container from "react-bootstrap/esm/Container";

//When the data is ready, render this dynamically
const Profile = () => {
  return (
    <Container className="col-md-10 text-secondary text-start major-wrapper">
      <div className="my-5 text-start mx-3">
        <h1>Profile</h1>
        <p>Username, this is where you view your profile.</p>
      </div>
      <hr />
      <div className="col-md-10 my-4 mx-3 mb-5">
        <ProfileInfo />
      </div>
    </Container>
  );
};

export default Profile;
