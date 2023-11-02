import { useAtomValue } from "jotai";
import {
  API_ENDPOINT,
  API_Response_Success,
  Response_Message,
} from "../lib/constants";
import { AuthDataAtom } from "../jotai/store";

export function useMakePOSTRequest() {
  const token = useAtomValue(AuthDataAtom);
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
        requestOptions.headers.Authorization = `Bearer ${token}`;
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
