export const http = {
  localhost: `http://localhost:4000`,
  webhost: process.env.REACT_APP_BACKEND_WEBHOST,
  isLocal: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
};
