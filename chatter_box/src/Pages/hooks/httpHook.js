import React from "react";


const useHttpHook = () => {
  const [isLoading, setLoading] = React.useState(null);
  const [Errors, setErrors] = React.useState(null);
  const clearErr = () => {
    setErrors((prev) => null);
  };
  const sendRequest = async (
    url,
    method = "GET",
    body = null,
    headers = {}
  ) => {
    try {
      setLoading((prev) => true);
      setErrors((prev)=>null)
      const response = await fetch(url, {
        method,
        body,
        headers,
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setLoading((prev) => null);
      return responseData;
    } catch (err) {
      setLoading((prev) => null);
      setErrors((prev) => err.message || "something went wrong");
    }
  };

  return { isLoading, Errors, clearErr, sendRequest };
};

export default useHttpHook;
