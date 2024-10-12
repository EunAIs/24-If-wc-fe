import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "baa14a5076089153261479a96e5f356e",
    language: "ko-KR",
  },
});

export default instance;
