import { API_ENDPOINT, API_Response_Success, Response_Message } from "../lib/constants";


export function useMakePOSTRequest() {
  function makePOSTRequest(methodEndpoint: any, params?: any) {
    return new Promise((resolve, reject) => {
      let data = "";
      for (let key in params) {
        data += key + "=" + params[key] + "&";
      }
      let accessToken = localStorage.getItem("access_token")
     const requestOptions: any = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      };
      if (accessToken) {
        console.log("inside")
        requestOptions.headers.Authorization = `Bearer ${accessToken}`;
      } 
     console.log("requestOptions", requestOptions)
      fetch(API_ENDPOINT + methodEndpoint, requestOptions)
        .then((response) => response.json() ?? response.text())
          .then( (response) => {
           resolve(response)
        }
        )
        .catch((error) => reject(error));
    });
  }
  return [makePOSTRequest]
}
