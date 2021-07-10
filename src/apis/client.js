import axios from "axios";

export default axios.create({
  baseURL: "https://axel-blog-api.herokuapp.com/posts",
  headers: {
    authorization: "bearer " + localStorage.getItem("user_token"),
  },
});
