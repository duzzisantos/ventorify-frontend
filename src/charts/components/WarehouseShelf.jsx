import { Card, Tab, Tabs } from "react-bootstrap";
import EmptyContent from "../../components/EmptyContent";
const WarehouseShelf = ({ data }) => {
  const uniqueCategories = [
    ...new Set(data.map((element) => element.category)),
  ];
  return (
    <div className="mb-5">
      <Tabs defaultValue={uniqueCategories[0]}>
        {uniqueCategories.map((category, categoryIndex) => (
          <Tab
            key={categoryIndex}
            eventKey={category}
            title={category}
            className="mt-3"
            aria-label={`Warehouse for ${category} category`}
          >
            <div className="d-flex flex-wrap">
              {data
                .filter((file) => file.category === category)
                .map((element, elementIndex) => (
                  <Card
                    key={elementIndex}
                    className={`border border-secondary shadow-sm bg-transparent ${
                      elementIndex.totalProductCount < 100
                        ? "text-danger"
                        : "text-success"
                    } rounded-1 p-5 mx-1 mb-2`}
                    style={{ height: "180px", width: "200px" }}
                  >
                    <div>{element.product}</div>
                    <div>{element.totalProductCount}</div>
                  </Card>
                ))}
              {data.filter((element) => element).length < 0 && <EmptyContent />}
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default WarehouseShelf;
