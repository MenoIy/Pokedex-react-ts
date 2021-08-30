import { useState, useEffect } from "react";

export interface IUseFetch {
  data: any;
  loading: boolean;
  error: boolean;
}

const useFetch = (url: string): IUseFetch => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
