import axios from "axios";

export default axios.create({
  baseURL: "https://axel-blog-api.herokuapp.com/",
  headers: {
    authorization: "bearer " + localStorage.getItem("user_token"),
  },
});
