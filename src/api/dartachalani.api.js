import axios from "axios";

const baseAxios = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const addNewRegistration = async (formData) => {
  // need to call the rest api using axios
  const response = await baseAxios.post("/submit", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(response);
  console.log(response.data);

  return response;
};

export const showAllRegistration = async () => {
  const response = await baseAxios.get("/list");

  return response;
};
