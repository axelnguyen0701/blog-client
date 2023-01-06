import axios from "axios";

export default axios.create({
    baseURL: "https://blog-api-opbw.onrender.com/",
    headers: {
        authorization: "bearer " + localStorage.getItem("user_token"),
    },
});
