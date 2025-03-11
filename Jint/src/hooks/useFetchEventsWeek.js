import { useEffect, useState, useContext } from 'react'
import { modalContext } from '../context/modalContext'

export const useFetchEventsWeek = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useContext(modalContext);

    const getData = async () => {
        try {
            const response = await fetch(
                // `http://jint_backend.test/api/events/eventsWeek/${user.id}`
                `http://127.0.0.1:8000/api/events/eventsWeek/${user.id}`
            )
            const eventsWeek = await response.json()
            setData(eventsWeek)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return {
        eventsWeek: data,
        isLoadingEventsWeek: isLoading,
    }
}
