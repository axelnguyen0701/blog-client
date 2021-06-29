import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    authorization: "bearer " + localStorage.getItem("user_token"),
  },
});
