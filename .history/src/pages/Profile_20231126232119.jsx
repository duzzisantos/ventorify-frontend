import Container from "react-bootstrap/esm/Container";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { customDateFormat } from "../utils/helpers";

//When the data is ready, render this dynamically
const Profile = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  return (
    <Container className="col-md-10 text-secondary text-start major-wrapper">
      <div className="my-5 text-start mx-3">
        <h1>Profile</h1>
        <p>Username, this is where you view your profile.</p>
      </div>
      <hr />
      <div className="col-md-10 my-4 mx-3 mb-5">
        <ul>
          <li>Display Name: {user.displayName}</li>
          <li>Email: {user.email}</li>
          <li>
            Telephone:{" "}
            {user.phoneNumber ?? "You have not provided a phone number."}
          </li>
          <li>Date Joined: {user.metadata.creationTime}</li>
          <li>Last Login: {user.metadata.lastSignInTime}</li>
        </ul>
        <Button
          variant="danger"
          onClick={() => {
            logout();
            navigate("/login");
          }}
          title="Log out"
        >
          Logout
        </Button>
      </div>
    </Container>
  );
};

export default Profile;
