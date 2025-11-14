import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken , setDToken] = useState(localStorage.getItem('dToken')? localStorage.getItem('dToken') : '')
    const [ appointments , setAppointments] = useState([])

    const getAppointments = async () => {

        try {

            const { data } = await axios.get(`${backendUrl}/api/v1/doctor/appointments` , {headers: {dtoken: dToken}} )

            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }
            
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const completeAppointment = async (appointmentId: string) => {

        try {

            const {data} = await axios.post(`${backendUrl}/api/v1/doctor/complete-appointment` , {appointmentId} , {headers: {dtoken : dToken}})
            
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const cancelAppointment = async (appointmentId : string) => {

        try {

            const {data} = await axios.post(`${backendUrl}/api/v1/doctor/cancel-appointment` , {appointmentId} , {headers: {dtoken : dToken}})
            
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const value = {
        dToken,
        setDToken,
        backendUrl,
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment
    }

    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider