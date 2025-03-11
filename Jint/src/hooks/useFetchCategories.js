import { useEffect, useState } from "react";

export const useFetchCategories = () => {
    const [data, setData] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    const getData = async () => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/categories/all"
                // "http://jint_backend.test/api/categories/all"
            );
            //const data = await response.json();
            const categories = await response.json();
            setData(categories);
            setIsLoadingCategories(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return {
        categories: data,
        isLoadingCategories,
    };
};