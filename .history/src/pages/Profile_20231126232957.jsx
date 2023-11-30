import Container from "react-bootstrap/esm/Container";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../auth/firebase";
import { useNavigate } from "react-router-dom";

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
        <div className="border px-5 lh-lg py-4 rounded-2">
          <p>
            <b>Display Name:</b> {user.displayName}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>Telephone: </b>
            {user.phoneNumber ?? "You have not provided a phone number."}
          </p>
          <p>
            <b>Date Joined:</b> {user.metadata.creationTime}
          </p>
          <p>
            <b>Last Login:</b> {user.metadata.lastSignInTime}
          </p>
          <Button
            variant="danger"
            onCpck={() => {
              logout();
              navigate("/login");
            }}
            title="Log out"
          >
            Logout
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
