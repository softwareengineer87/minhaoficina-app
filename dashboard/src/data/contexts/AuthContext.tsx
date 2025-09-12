'use client';

import { createContext, useEffect, useState } from "react";
import { baseURL } from "../../utils/api";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Business, BusinessPayload } from "../../models/Business";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  login(email: string, password: string): Promise<void>;
  business: BusinessPayload;
  signup(business: Business): Promise<void>;
  saveLogo(file: any, businessId: string): Promise<void>;
  logout(): void;
  loadBusiness(businessId: string): Promise<void>;
  businessDetail: Business;
  businessId: string,
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
  const [businessId, setBusinessId] = useState<string>('');
  const { getLocalStorage, setLocalStorage, deleteLocalStorage } = useLocalStorage();

  function handleActiveMessage() {
    setActiveMessage(true);
    setTimeout(() => {
      setActiveMessage(false);
    }, 4000);
  }

  const { push } = useRouter();

  function redirectTo(url: string) {
    setTimeout(() => {
      push(url);
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
        setCookie(null, 'minhaoficina-token', data.token, {
          maxAge: 7 * 60 * 60 * 60
        });
        setLocalStorage('oficina-payload', data);
        redirectTo('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function signup(business: Business) {
    try {
      const response = await fetch(`${baseURL}/business`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: business.name,
          email: business.email,
          password: business.password,
        })
      });

      const data = await response.json();
      handleActiveMessage();
      if (data.statusCode === 500) {
        setStatus(response.ok);
        setMessage(data.message);
      }
      setStatus(response.ok);
      setMessage(data.message);
      setBusinessId(data.businessId);
    } catch (error) {
      console.log(error);
    }
  }

  async function saveLogo(file: any, businessId: string) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const responsePhoto = await fetch(`${baseURL}/logo/${businessId}`, {
        method: 'POST',
        body: formData
      });
      const dataPhoto = await responsePhoto.json();
      handleActiveMessage();
      if (dataPhoto.statusCode === 500) {
        setMessage(dataPhoto.message);
        setStatus(responsePhoto.ok);
      }
      setMessage(dataPhoto.message);
      setStatus(responsePhoto.ok);
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
      signup,
      saveLogo,
      logout,
      loadBusiness,
      businessDetail,
      businessId,
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
