import { useState } from "react";
import type { Business } from "../../models/Business";
import { baseURL } from "../../utils/api";

function useBusiness() {

  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [activeMessage, setActiveMessage] = useState<boolean>(false);
  const [businessDetail, setBusinessDetail] = useState<Business>({} as Business);

  function handleActiveMessage() {
    setActiveMessage(true);
    setTimeout(() => {
      setActiveMessage(false);
    }, 4000);
  }

  async function loadBusiness(businesId: string) {
    try {
      const response = await fetch(`${baseURL}/business/${businesId}`);
      const data = await response.json();
      setBusinessDetail(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateBusiness(business: Business) {
    try {
      const response = await fetch(`${baseURL}/business/${business.businessId}`, {
        method: 'PUT',
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
      return response;

    } catch (error) {
      console.log(error);
    }
  }

  return {
    loadBusiness,
    businessDetail,
    updateBusiness,
    setBusinessDetail,
    message,
    status,
    activeMessage
  }

}

export { useBusiness }

