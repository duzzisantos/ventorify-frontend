import Container from "react-bootstrap/esm/Container";
import Prices from "../components/Prices";
import PriceTable from "../components/PricesTable";

const PricesPage = () => {
  return (
    <Container className="col-md-10 text-secondary my-5 py-5">
      <div className="text-start mx-3">
        <h1 className="fw-bold">Price</h1>
        <p>Manage price information per pricing policy.</p>
      </div>
      <hr />
      <Prices />
      <PriceTable />
    </Container>
  );
};

export default PricesPage;
