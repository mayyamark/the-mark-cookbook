import { useState, useEffect } from 'react';

const useGetData = (url) => {
  const [response, setResponse] = useState({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    setResponse({ loading: true, data: null, error: null });

    fetch(url, {
      method: 'GET',
    })
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((res) => {
        setResponse({ loading: false, data: res, error: null });
      })
      .catch((error) => {
        setResponse({ loading: false, data: null, error: error });
      });
  }, [url]);

  return response;
};

export default useGetData;
