import { fakeData as data } from "../components/fakeData";
import LandingPageTemplate from "../components/landing-page-card";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import LandingPageIntro from "../components/LandingPageIntro";

const LandingPage = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="py-2">
      {!user && (
        <div className="d-flex justify-content-end me-3 gap-3">
          <a
            href="/signup"
            className="btn bg-transparent border border-secondary"
          >
            Signup
          </a>
          <a href="/login" className="btn btn-success">
            Login
          </a>
        </div>
      )}
      <div className="container col-md-10 text-secondary pt-5 pb-5">
        <h1 className="fw-bold">Welcome to Ventorify </h1>

        <div className="rows cols flex-wrap hstack gap-5 align-items-center justify-content-center p-4 mt-3 pb-5">
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
