import { redirect } from "react-router-dom";

export const getBase64Image = async (url) => {
  const res = await fetch(url);
  const blob = await res.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      return reject(this);
    };

    reader.readAsDataURL(blob);
  });
};
