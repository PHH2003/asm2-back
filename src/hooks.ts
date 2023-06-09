import { useState } from "react";
// Hook 
export function useLocalStorege(key: string, initialValue: any){
    //State to store our value
    // Pass initial state funcion to useState to logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        if(typeof window === "undefined"){
            return initialValue;
        } 
        try{
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item): initialValue
        } catch(error){
            // if error also return initialValue
            console.log(error);
            return initialValue
        }
    })
    // Return a wrapped version of useState's setter funcion that...
    // ... persists the new value to localStorage
    const setValue = (value: any) => {
        try{
            // Allow value to be a funcion so we have same API as useState
            const valueToStore = 
            value instanceof Function ? value(storedValue) : value
            // save state
            setStoredValue(valueToStore)
            // Save to local storage
            if(typeof window !== "undefined"){
                window.localStorage.setItem(key, JSON.stringify(valueToStore))
            }
        }catch(error){
            // A more advanced implementation would handle the error case
            console.log(error);
            
        }
    }
    return[storedValue, setValue]
}