import Launch from "../models/Launch";
import Part from "../models/Part";

export function setLocalStorageLaunchs(key: string, value: Launch[]) {
    const data =  JSON.stringify(value)
    localStorage.setItem(key, data);
}

export function setLocalStorageParts(key: string, value: Part[]) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorge(key: string) {
   const data = localStorage.getItem(key);
   return JSON.parse(data!);
}
