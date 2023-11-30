import axios from "axios";

const useSendConfirmation = (postObject) => {
  axios
    .post("http://localhost:4000/api/customer-order/dispatch", postObject)
    .then((res) => {
      console.log(res.statusText);
    })
    .catch((err) => console.warn(err));
};
