import {
  API_ENDPOINT,
} from "../lib/constants";

export function useMakePOSTRequest() {
  const token = localStorage.getItem('access_token')
  function makePOSTRequest(methodEndpoint: any, params?: any) {
    return new Promise((resolve, reject) => {
      let data = "";
      for (let key in params) {
        data += key + "=" + params[key] + "&";
      }
      const requestOptions: any = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      };
      if (token) {
        requestOptions.headers.Authorization = `Bearer ${token.replace(/['"]+/g, '')}`;
      }
      console.log("requestOptions", requestOptions);
      fetch(API_ENDPOINT + methodEndpoint, requestOptions)
        .then((response) => response.json() ?? response.text())
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  }
  return [makePOSTRequest];
}
