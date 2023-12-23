export const http = {
  localhost: process.env.REACT_APP_BACKEND_LOCAL,
  webhost: process.env.REACT_APP_BACKEND_WEBHOST,
  isLocal: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
};
