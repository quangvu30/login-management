import axios from "axios";

// intercepting to capture errors
// axios.interceptors.response.use(
//   function (response) {
//     return response.data ? response.data : response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     let message;
//     switch (error.status) {
//       case 500:
//         message = "Internal Server Error";
//         break;
//       case 401:
//         message = "Invalid credentials";
//         break;
//       case 404:
//         message = "Sorry! the data you are looking for could not be found";
//         break;
//       default:
//         message = error.message || error;
//     }
//     return Promise.reject(message);
//   }
// );

// export const setAuthorization = (cookies) => {
//   axios.defaults.headers.common["Authorization"] = "Bearer " + token;
// };

export const get = async (url: string, params: any) => {
  let response;

  let paramKeys: string[] = [];

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: url,
  };

  if (params) {
    Object.keys(params).map((key) => {
      paramKeys.push(key + "=" + params[key]);
      return paramKeys;
    });
    const queryString =
      paramKeys && paramKeys.length ? paramKeys.join("&") : "";
    config.url = `${url}?${queryString}`;
    response = await axios(config);
  } else {
    response = await axios(config);
  }

  return response;
};

export const post = async (url: string, data: any) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url,
    data: data,
  };

  return await axios(config);
};

export const put = async (url: string, data: any) => {
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: url,
    data: data,
  };

  return await axios(config);
};

export const patch = async (url: string, data: any) => {
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: url,
    data: data,
  };

  return await axios(config);
};
