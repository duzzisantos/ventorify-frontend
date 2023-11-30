import { fakeData as data } from "../components/fakeData";
import LandingPageTemplate from "../components/landing-page-card";
// import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import LandingPageIntro from "../components/LandingPageIntro";
import { Button } from "react-bootstrap";

const LandingPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  return (
    <div>
      {!user && (
        <div className="d-flex justify-content-end me-3 gap-3">
          <Button
            variant="transparent"
            className="border border-secondary"
            onClick={() => navigate("/login")}
          >
            Signup
          </Button>
          <Button variant="success" onClick={() => navigate("/signup")}>
            Login
          </Button>
        </div>
      )}
      <div className="container col-md-10 text-secondary pt-5 pb-5">
        <h1 className="fw-bold">Welcome to Ventorify </h1>

        <div className="rows cols flex-wrap hstack gap-5 align-items-center justify-content-center p-4 pb-5">
          <LandingPageIntro />
          {data.map((item) => {
            const { title, description, id, image } = item;
            return (
              <LandingPageTemplate
                key={id}
                header={title}
                mainContent={description}
                image={image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
