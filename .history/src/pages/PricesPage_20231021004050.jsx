import Container from "react-bootstrap/esm/Container";

const PricesPage = () => {
  return (
    <Container className="col-md-10 text-secondary vh-100">
      <div className="my-5 text-start mx-3">
        <h1 className="fw-bold">Price</h1>
        <p>Manage price information per pricing policy.</p>
      </div>
      <hr />
    </Container>
  );
};

export default PricesPage;
