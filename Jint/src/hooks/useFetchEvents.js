import { useEffect, useState, useContext} from "react";
import { modalContext } from "../context/modalContext";

export const useFetchEvents = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useContext(modalContext);

    const getData = async () => {
        try {
            const response = await fetch(
                // `http://jint_backend.test/api/events/all/${user.id}`
                `http://127.0.0.1:8000/api/events/all/${user.id}`
            );
            //const data = await response.json();
            const events = await response.json();
            setData(events);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return {
        data,
        isLoading,
    };
};
