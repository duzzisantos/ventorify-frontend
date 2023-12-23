import axios from "axios";

const sendConfirmation = (postObject, accessToken) => {
  axios
    .post("http://localhost:4000/api/customer-order", postObject, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res.statusText);
    })
    .catch((err) => console.warn(err));
};

export { sendConfirmation };
