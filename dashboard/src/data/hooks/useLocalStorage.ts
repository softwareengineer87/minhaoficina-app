import { useCallback } from "react";

function useLocalStorage() {

  const getLocalStorage = useCallback((key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }, []);

  const setLocalStorage = useCallback((key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  }, []);

  const deleteLocalStorage = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);

  return {
    getLocalStorage,
    setLocalStorage,
    deleteLocalStorage
  }

}

export { useLocalStorage }

