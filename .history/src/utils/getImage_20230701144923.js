//Converts image from url string to base 64 format
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
