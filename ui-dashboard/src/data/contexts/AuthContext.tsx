import { createContext, useEffect, useState } from "react";
import { baseURL } from "../../utils/api";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { redirect } from "react-router-dom";
import type { Business, BusinessPayload } from "../../models/Business";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  login(email: string, password: string): Promise<void>;
  business: BusinessPayload;
  logout(): void;
  loadBusiness(businessId: string): Promise<void>;
  businessDetail: Business;
  message: string,
  status: boolean;
  activeMessage: boolean;
}

const AuthContext = createContext({} as AuthContextProps);

function AuthProvider({ children }: AuthProviderProps) {
  const [business, setBusiness] = useState<BusinessPayload>({} as BusinessPayload);
  const [businessDetail, setBusinessDetail] = useState<Business>({} as Business);
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [activeMessage, setActiveMessage] = useState<boolean>(false);
  const { getLocalStorage, setLocalStorage, deleteLocalStorage } = useLocalStorage();

  function handleActiveMessage() {
    setActiveMessage(true);
    setTimeout(() => {
      setActiveMessage(false);
    }, 4000);
  }

  function redirectTo(url: string) {
    setTimeout(() => {
      redirect(url);
    }, 3000);
  }

  async function login(email: string, password: string) {
    try {
      const response = await fetch(`${baseURL}/business/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const data = await response.json();
      handleActiveMessage();
      if (data.statusCode === 500) {
        setStatus(response.ok);
        setMessage(data.message);
        return;
      }
      setStatus(response.ok);
      setMessage(data.message);
      setBusiness(data);
      if (response.ok) {
        setLocalStorage('oficina-payload', data);
        redirectTo('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    deleteLocalStorage('oficina-payload');
    setBusiness({} as BusinessPayload);
    handleActiveMessage();
    setMessage('Logout feito, você está sendo redirecionado.');
    redirectTo('/');
  }

  async function loadBusiness(businesId: string) {
    try {
      const response = await fetch(`${baseURL}/business/${businesId}`);
      const data = await response.json();
      if (data) {
        setBusinessDetail(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const businessData = getLocalStorage('oficina-payload');
    console.log(businessData);
    if (businessData) {
      setBusiness(businessData);
    }
  }, [getLocalStorage]);

  return (
    <AuthContext.Provider value={{
      login,
      business,
      logout,
      loadBusiness,
      businessDetail,
      message,
      status,
      activeMessage
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export {
  AuthContext,
  AuthProvider
}
