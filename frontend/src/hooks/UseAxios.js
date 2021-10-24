import { useState, useEffect } from "react"
import api from '../services/api'

export const useAxios = (axiosParams={}) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async (params) => {
    setLoading(true)
    try {
      const result = await api.request(params);
      setResponse(result.data);
      setError('')
    } catch( error ) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchData(axiosParams);
  }, []); // execute once only

  return { response, error, loading, fetchData };
}