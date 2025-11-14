import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency = "LKR: "

    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


    const slotDateFormat = (slotDate: string) => {
        if (!slotDate) return '-';
        const dateArray = slotDate.split('-');
        const year = dateArray[0];
        const monthIndex = Number(dateArray[1]) - 1;
        const day = dateArray[2];
        return `${day} ${months[monthIndex]} ${year}`;
    };

    const value = {
        calculateAge,
        slotDateFormat,
        currency
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider