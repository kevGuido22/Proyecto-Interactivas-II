import { useEffect, useState, useContext } from "react";
import { modalContext } from "../context/modalContext";

export const useFetchCourses = () =>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useContext(modalContext);

    const getData = async () => {
        try{
            const response = await fetch(
                // `http://jint_backend.test/api/courses/all/${user.id}`
                `http://127.0.0.1:8000/api/courses/all/${user.id}`
            );
            const courses = await response.json();
            setData(courses);
            setIsLoading(false);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return{
        courses: data,
        isLoadingCourses: isLoading,
    }
}