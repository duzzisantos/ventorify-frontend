import React from "react";
import ProfileInfo from "../auth/ProfileInfo";

import Container from "react-bootstrap/esm/Container";
import { Button } from "react-bootstrap";

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
        <Button>Logout</Button>
      </div>
    </Container>
  );
};

export default Profile;
