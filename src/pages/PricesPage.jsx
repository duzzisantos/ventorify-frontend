import Container from "react-bootstrap/esm/Container";
import Prices from "../components/Prices";
import PriceTable from "../components/PricesTable";

const PricesPage = ({ accessToken }) => {
  return (
    <Container className="col-md-10 text-secondary my-5 pb-5">
      <div className="text-start mx-3">
        <h1 className="fw-bold">Prices</h1>
        <p>Manage price information according to pricing policy.</p>
      </div>
      <hr />
      <Prices accessToken={accessToken} />
      <PriceTable accessToken={accessToken} />
    </Container>
  );
};

export default PricesPage;
