import axios from "axios";

const sendConfirmation = (postObject) => {
  axios
    .post("http://localhost:4000/api/customer-order", postObject)
    .then((res) => {
      console.log(res.statusText);
    })
    .catch((err) => console.warn(err));
};

export default { sendConfirmation };
