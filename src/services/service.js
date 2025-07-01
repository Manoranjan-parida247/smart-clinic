import axios from "axios";

export const userService = {
  loginService,
  get,
  post,
};

async function loginService(apiEndpoint, payload) {
  try {
    const response = await axios.post(apiEndpoint, payload);
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function get(apiEndpoint) {
  try {
    const response = await axios.get(apiEndpoint);
    return response;
  } catch (err) {
    return err;
  }
}

async function post(apiEndpoint, payload) {
  try {
    const response = await axios.post(apiEndpoint, payload);
    return response;
  } catch (err) {
    return err;
  }
}
