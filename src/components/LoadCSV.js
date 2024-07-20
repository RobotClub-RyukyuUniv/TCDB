import { useEffect } from 'react';
import Papa from 'papaparse';

const LoadCSV = ({ setCsvData }) => {
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.PUBLIC_URL}/robot_DB_example.csv`);
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const text = await response.text();
            const parsedData = Papa.parse(text, { header: true });
            setCsvData(parsedData.data);
        } catch (error) {
            console.error('Error fetching the CSV file:', error);
        }
        };

        fetchData();
    }, [setCsvData]);

  return null; // このコンポーネントはデータをロードするだけなので、UIはありません
};

export default LoadCSV;