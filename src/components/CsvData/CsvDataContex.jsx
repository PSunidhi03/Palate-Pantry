import { useEffect, useState } from "react";
import Papa from "papaparse";

const fetchCsvData = async (filePath) => {
  const response = await fetch(filePath);
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value);
  return Papa.parse(csv, { header: true }).data;
};

export const useFetchCsvData = () => {
  const [cuisinesData, setCuisinesData] = useState([]);
  const [pantryIngredientsData, setPantryIngredientsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cuisinesData = await fetchCsvData(
          "https://cuisines-bucket.s3.ap-south-1.amazonaws.com/cuisines-final.csv",
        );
        const pantryIngredientsData = await fetchCsvData(
          "https://cuisines-bucket.s3.ap-south-1.amazonaws.com/pantryingredients.csv",
        );
        setCuisinesData(cuisinesData);
        setPantryIngredientsData(pantryIngredientsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cuisinesData, pantryIngredientsData, loading, error };
};
