import axios from "axios";

const expressOptions = {
  baseUrl: "/api",
  devUrl: "http://localhost:5000"
};

// check dev environment, we're proxying through NGINX on 8081 port (/api endpoint)
const expressUrl =
  window.location.port === "3000"
    ? expressOptions.devUrl
    : expressOptions.baseUrl;

export default axios.create({
  baseURL: expressUrl
});
