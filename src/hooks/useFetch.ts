import { useState, useEffect } from "react";

interface IUseFetch {
  data: JSON | null;
  loading: boolean;
  error: boolean;
}

interface IUseFetchOptions {
  limit?: number;
  offset?: number;
}

const useFetch = (url: string, option?: IUseFetchOptions): IUseFetch => {
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
  });
  return { data, loading, error };
};

export default useFetch;
