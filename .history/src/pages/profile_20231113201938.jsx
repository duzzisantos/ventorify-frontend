import Container from "react-bootstrap/esm/Container";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//When the data is ready, render this dynamically
const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/auth/logout");
      if (response.status === 200) {
        console.log(response.statusText);
        navigate("/login", { state: `Login back as Duzzisantos` });
      } else {
        console.log(response.statusText);
      }
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  };
  return (
    <Container className="col-md-10 text-secondary text-start major-wrapper">
      <div className="my-5 text-start mx-3">
        <h1>Profile</h1>
        <p>Username, this is where you view your profile.</p>
      </div>
      <hr />
      <div className="col-md-10 my-4 mx-3 mb-5">
        <Button variant="danger">Logout</Button>
      </div>
    </Container>
  );
};

export default Profile;
