import { Card, Tab, Tabs } from "react-bootstrap";
import EmptyContent from "../../components/empty-content";

const ShelfBody = ({ data }) => {
  const uniqueCategories = [
    ...new Set(data.map((element) => element.category)),
  ];
  return (
    <div style={{ height: "fit-content" }} className="mb-5">
      <Tabs defaultActiveKey={uniqueCategories[0]}>
        {uniqueCategories.map((item, index) => (
          <Tab
            key={index}
            eventKey={item}
            title={item}
            className=" mt-3"
            aria-label={`Shelf for ${item} category`}
          >
            <div className="d-flex flex-wrap">
              {data
                .filter((file) => (file.category === item ? file : !file))
                .map((element, fileIndex) => (
                  <Card
                    key={fileIndex}
                    className={`border border-secondary shadow-sm bg-transparent ${
                      element.totalProductCount < 100
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

export default ShelfBody;
