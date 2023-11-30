import Container from "react-bootstrap/esm/Container";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import {
  Calendar2Date,
  EnvelopeFill,
  PersonFill,
  Power,
  ShieldLockFill,
  TelephoneFill,
} from "react-bootstrap-icons";

//When the data is ready, render this dynamically
const Profile = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  return (
    <Container className="col-md-10 text-secondary text-start major-wrapper">
      <h1 className="my-5 text-start mx-3">Profile</h1>
      <hr />
      <div className="col-md-10 my-4 mx-3 mb-5">
        <div className="lh-lg py-4 rounded-2 col-lg-6 col-md-12">
          <p>
            <PersonFill /> <b>Display Name:</b> {user.displayName}
          </p>
          <p>
            <EnvelopeFill /> <b>Email:</b> {user.email}
          </p>
          <p>
            <TelephoneFill /> <b>Telephone: </b>
            {user.phoneNumber ?? "You have not provided a phone number."}
          </p>
          <p>
            <Calendar2Date /> <b>Date Joined:</b> {user.metadata.creationTime}
          </p>
          <p>
            <ShieldLockFill /> <b>Last Login:</b> {user.metadata.lastSignInTime}
          </p>
          <Button
            variant="danger"
            onClick={() => {
              logout();
              navigate("/login");
            }}
            title="Log out"
          >
            Logout <Power />
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
