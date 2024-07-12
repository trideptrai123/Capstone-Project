import axios from "axios";
import { useState, useEffect } from "react";
import { handleErrorHttp } from "../error/HttpError";

const useFetchData = (apiCall, setDataProps, depen = [], isDeep = false,ishandle  = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall();
        const responseData = response.data;

        setData(responseData);
        if (setDataProps) {
          if (isDeep) {
            setDataProps(responseData?.Data?.Data);
          } else {
            setDataProps(responseData);
          }
        }
        setLoading(false);
      } catch (error) {
        if(ishandle){
          handleErrorHttp(error);
        }
      }
    };

   
    fetchData();
   

    return () => {
      // Cleanup function
    };
  }, depen);

  return { data, loading, error };
};

export default useFetchData;
