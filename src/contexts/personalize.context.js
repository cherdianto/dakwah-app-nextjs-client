import { createContext, useContext, useState } from "react";

export const PersonalizeContextImpl = createContext(null)

export function usePersonalize() {
    return useContext(PersonalizeContextImpl)
}

export const PersonalizeProvider = ({ children, initialPersonalize }) => {
    const [personalize, setPersonalize] = useState(initialPersonalize)

    return <PersonalizeContextImpl.Provider value={{ personalize, setPersonalize}}>
        {children}
    </PersonalizeContextImpl.Provider>
}