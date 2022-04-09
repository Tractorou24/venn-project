import { useState, useEffect, useCallback } from "react";
import { getAll } from "../Firebase";

export default function useGetAll({ collection }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    try {
      setData(await getAll(collection));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    getData();
  }, []);

  return { data, loading, error };
}
