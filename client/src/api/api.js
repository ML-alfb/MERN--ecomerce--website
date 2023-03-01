import axios from "axios";
async function register(formData) {
  const { username, password, passwordC, email } = formData;
  try {
    const response = await axios.post("/api/users/create", {
      username,
      password,
      passwordC,
      email,
    });
    // console.log(reponse.data);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error?.response?.data?.msg);
  }
}
async function login(formData) {
  const { username, password } = formData;
  try {
    const response = await axios.post("/api/users/login", {
      username,
      password,
    });
    // console.log(reponse.data);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error?.response?.data?.msg);
  }
}
export { register, login };
