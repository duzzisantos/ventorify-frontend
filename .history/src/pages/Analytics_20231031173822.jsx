import { useState, useEffect } from "react";
import axios from "axios";

const EmployeePerformance = () => {
  const [warehouse, setWarehouse] = useState([]);
  //get warehouse data to generate operations report with
  useEffect(() => {
    const getWarehouse = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/warehouse");
        const data = res.data;
        setWarehouse(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getWarehouse();
  }, []);
};
